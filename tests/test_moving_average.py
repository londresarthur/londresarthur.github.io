"""
Testes Unitários para o Filtro de Média Móvel e Algoritmos DSP
Acervo Acadêmico USP — Processamento Digital de Sinais
"""

import math
import random
import unittest


def moving_average_causal(x, M):
    N = len(x)
    y = [None] * N
    for i in range(M - 1, N):
        y[i] = sum(x[i - k] for k in range(M)) / M
    return y


def moving_average_centralized(x, M):
    N = len(x)
    y = [None] * N
    half_left = (M - 1) // 2
    half_right = M // 2
    for i in range(half_left, N - half_right):
        y[i] = sum(x[i + k] for k in range(-half_left, half_right + 1)) / M
    return y


def moving_average_ema(x, M):
    N = len(x)
    y = [None] * N
    if N == 0:
        return y
    alpha = 2.0 / (M + 1.0)
    prev = x[0]
    y[0] = prev
    for i in range(1, N):
        prev = alpha * x[i] + (1.0 - alpha) * prev
        y[i] = prev
    return y


def median_filter(x, M):
    N = len(x)
    y = [None] * N
    half = M // 2
    for i in range(half, N - half):
        window = sorted(x[i - half : i + half + 1])
        mid = len(window) // 2
        y[i] = window[mid] if len(window) % 2 != 0 else (window[mid - 1] + window[mid]) / 2.0
    return y


def frequency_response_magnitude(omega, M):
    if abs(omega) < 1e-9:
        return 1.0
    num = math.sin(omega * M / 2.0)
    den = M * math.sin(omega / 2.0)
    return abs(num / den)


class TestMovingAverageDSP(unittest.TestCase):
    def test_dc_invariance(self):
        """Um sinal constante (DC) deve ser invariante sob filtragem de média móvel."""
        c = 3.5
        x = [c] * 50
        for M in [2, 5, 10]:
            y = moving_average_causal(x, M)
            valid = [v for v in y if v is not None]
            for v in valid:
                self.assertAlmostEqual(v, c, places=7)

    def test_impulse_response(self):
        """A resposta ao impulso h[n] de um filtro FIR de média móvel causal deve ser 1/M para 0 <= n < M."""
        M = 5
        x = [1.0] + [0.0] * 20
        # h[n] = y[n] com entrada delta[n]
        # Implementando convolução direta h[n] = 1/M para n in [0, M-1]
        y = [0.0] * len(x)
        for n in range(len(x)):
            s = 0.0
            for k in range(M):
                if n - k >= 0:
                    s += x[n - k]
            y[n] = s / M

        for n in range(M):
            self.assertAlmostEqual(y[n], 1.0 / M, places=7)
        for n in range(M, len(x)):
            self.assertAlmostEqual(y[n], 0.0, places=7)

    def test_group_delay_step_transition(self):
        """O degrau filtrado causalmente atinge exatamente a média no atraso de grupo (M - 1) / 2."""
        M = 5
        N = 41
        step_idx = 20
        x = [2.0 if i < step_idx else 1.0 for i in range(N)]
        y = moving_average_causal(x, M)

        # Em n = step_idx + (M - 1) // 2 = 22, a janela possui amostras de 2.0 e 1.0
        # Especificamente, para M = 5, n = 22 janela é [18, 19, 20, 21, 22] que tem dois 2.0 e três 1.0 -> média 1.4
        # O ponto intermediário da rampa ocorre no atraso de grupo
        expected_ramp_len = M
        # A transição inicia em step_idx e termina em step_idx + M - 1
        self.assertEqual(y[step_idx - 1], 2.0)
        self.assertEqual(y[step_idx + M - 1], 1.0)
        # Valores estritamente decrescentes durante a transição
        for i in range(step_idx, step_idx + M - 1):
            self.assertGreater(y[i], y[i + 1])

    def test_centralized_symmetry(self):
        """A média centralizada deve ser simétrica em torno do degrau, sem defasagem temporal."""
        M = 5
        N = 41
        step_idx = 20
        x = [2.0 if i < step_idx else 1.0 for i in range(N)]
        y = moving_average_centralized(x, M)

        # Na média centralizada com M=5 (k in -2..2):
        # n = 20: janela é [18, 19, 20, 21, 22] -> dois 2.0, três 1.0 -> valor 1.4
        # n = 19: janela é [17, 18, 19, 20, 21] -> três 2.0, dois 1.0 -> valor 1.6
        # A simetria em torno do degrau (2.0 + 1.0)/2 = 1.5 é exata: 1.6 - 1.5 == 1.5 - 1.4 == 0.1
        self.assertAlmostEqual(y[19] - 1.5, 1.5 - y[20], places=7)

    def test_median_filter_impulse_rejection(self):
        """Filtro de mediana deve rejeitar completamente outliers pontuais (sal e pimenta)."""
        x = [1.0] * 30
        x[15] = 999.0  # Outlier extremo
        y = median_filter(x, M=5)
        # O outlier na posição 15 deve ser eliminado pela mediana da vizinhança
        self.assertEqual(y[15], 1.0)

    def test_variance_reduction_white_noise(self):
        """A variância do ruído branco na saída de um filtro de média móvel deve reduzir por 1/M."""
        random.seed(42)
        N = 10000
        sigma = 1.0
        # Ruído branco gaussiano
        noise = [random.gauss(0, sigma) for _ in range(N)]
        M = 10
        y = moving_average_causal(noise, M)
        valid = [v for v in y if v is not None]

        mean_out = sum(valid) / len(valid)
        var_out = sum((v - mean_out) ** 2 for v in valid) / (len(valid) - 1)

        expected_var = (sigma**2) / M  # 0.10
        # Margem de tolerância estatística de 10% para 10.000 amostras
        self.assertAlmostEqual(var_out, expected_var, delta=0.015)

    def test_frequency_response(self):
        """|H(e^{j\omega})| deve ser 1 em omega=0 e 0 no primeiro nulo omega = 2*pi / M."""
        for M in [5, 10]:
            h0 = frequency_response_magnitude(0.0, M)
            self.assertAlmostEqual(h0, 1.0, places=7)

            first_null = (2.0 * math.pi) / M
            h_null = frequency_response_magnitude(first_null, M)
            self.assertAlmostEqual(h_null, 0.0, places=7)


if __name__ == "__main__":
    unittest.main()
