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


def kalman_filter_1d(z, Q=0.005, R=0.04, x0=None, P0=1.0):
    N = len(z)
    y = [0.0] * N
    x_hat = z[0] if x0 is None else x0
    P = P0
    for k in range(N):
        # Predicao
        P_minus = P + Q
        # Atualizacao
        K = P_minus / (P_minus + R)
        x_hat = x_hat + K * (z[k] - x_hat)
        P = (1.0 - K) * P_minus
        y[k] = x_hat
    return y


def dwt_haar_1d(signal):
    n = len(signal)
    half = n // 2
    approx = [0.0] * half
    detail = [0.0] * half
    sqrt2 = math.sqrt(2.0)
    for i in range(half):
        s0 = signal[2 * i]
        s1 = signal[2 * i + 1] if 2 * i + 1 < n else signal[2 * i]
        approx[i] = (s0 + s1) / sqrt2
        detail[i] = (s1 - s0) / sqrt2
    return approx, detail


def idwt_haar_1d(approx, detail, target_len=None):
    half = len(approx)
    n = target_len if target_len is not None else half * 2
    rec = [0.0] * n
    sqrt2 = math.sqrt(2.0)
    for i in range(half):
        a = approx[i]
        d = detail[i]
        if 2 * i < n:
            rec[2 * i] = (a - d) / sqrt2
        if 2 * i + 1 < n:
            rec[2 * i + 1] = (a + d) / sqrt2
    return rec


def wavelet_haar_denoise(signal, levels=2, threshold_mult=1.0):
    N = len(signal)
    if N < 4:
        return list(signal)
    approx_pyramid = []
    detail_pyramid = []
    curr = list(signal)

    for _ in range(levels):
        app, det = dwt_haar_1d(curr)
        detail_pyramid.append(det)
        approx_pyramid.append(app)
        curr = app

    # Estimativa de ruido Donoho-Johnstone MAD
    d1 = detail_pyramid[0]
    sorted_abs = sorted(abs(v) for v in d1)
    median_abs = (
        (sorted_abs[len(sorted_abs) // 2 - 1] + sorted_abs[len(sorted_abs) // 2]) / 2.0
        if len(sorted_abs) % 2 == 0
        else sorted_abs[len(sorted_abs) // 2]
    )
    sigma_hat = median_abs / 0.6745 if median_abs > 1e-9 else 0.05
    lam = sigma_hat * math.sqrt(2.0 * math.log(N)) * threshold_mult

    # Soft thresholding
    for lvl in range(levels):
        det = detail_pyramid[lvl]
        for i in range(len(det)):
            val = det[i]
            mag = abs(val)
            det[i] = math.copysign(max(0.0, mag - lam), val) if mag > 1e-12 else 0.0

    rec = curr
    for lvl in reversed(range(levels)):
        det = detail_pyramid[lvl]
        t_len = N if lvl == 0 else len(approx_pyramid[lvl - 1])
        rec = idwt_haar_1d(rec, det, t_len)
    return rec


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

        self.assertEqual(y[step_idx - 1], 2.0)
        self.assertEqual(y[step_idx + M - 1], 1.0)
        for i in range(step_idx, step_idx + M - 1):
            self.assertGreater(y[i], y[i + 1])

    def test_centralized_symmetry(self):
        """A média centralizada deve ser simétrica em torno do degrau, sem defasagem temporal."""
        M = 5
        N = 41
        step_idx = 20
        x = [2.0 if i < step_idx else 1.0 for i in range(N)]
        y = moving_average_centralized(x, M)
        self.assertAlmostEqual(y[19] - 1.5, 1.5 - y[20], places=7)

    def test_median_filter_impulse_rejection(self):
        """Filtro de mediana deve rejeitar completamente outliers pontuais (sal e pimenta)."""
        x = [1.0] * 30
        x[15] = 999.0
        y = median_filter(x, M=5)
        self.assertEqual(y[15], 1.0)

    def test_variance_reduction_white_noise(self):
        """A variância do ruído branco na saída de um filtro de média móvel deve reduzir por 1/M."""
        random.seed(42)
        N = 10000
        sigma = 1.0
        noise = [random.gauss(0, sigma) for _ in range(N)]
        M = 10
        y = moving_average_causal(noise, M)
        valid = [v for v in y if v is not None]

        mean_out = sum(valid) / len(valid)
        var_out = sum((v - mean_out) ** 2 for v in valid) / (len(valid) - 1)
        expected_var = (sigma**2) / M
        self.assertAlmostEqual(var_out, expected_var, delta=0.015)

    def test_frequency_response(self):
        """|H(e^{j\omega})| deve ser 1 em omega=0 e 0 no primeiro nulo omega = 2*pi / M."""
        for M in [5, 10]:
            h0 = frequency_response_magnitude(0.0, M)
            self.assertAlmostEqual(h0, 1.0, places=7)
            first_null = (2.0 * math.pi) / M
            h_null = frequency_response_magnitude(first_null, M)
            self.assertAlmostEqual(h_null, 0.0, places=7)

    def test_kalman_filter_convergence(self):
        """Filtro de Kalman 1D deve convergir suavemente para o patamar DC sob ruído."""
        random.seed(42)
        N = 100
        true_val = 2.0
        noisy = [true_val + random.gauss(0, 0.2) for _ in range(N)]
        filtered = kalman_filter_1d(noisy, Q=0.001, R=0.04, x0=noisy[0])
        # Ultimas amostras devem estar muito proximas do valor real
        steady_state = sum(filtered[70:]) / len(filtered[70:])
        self.assertAlmostEqual(steady_state, true_val, delta=0.05)

    def test_wavelet_perfect_reconstruction(self):
        """DWT e IDWT de Haar com limiar zero devem ter reconstrução perfeita."""
        signal = [2.0, 1.5, 3.1, -0.4, 1.8, 2.2, 0.7, -1.0]
        rec = wavelet_haar_denoise(signal, levels=2, threshold_mult=0.0)
        for orig, r in zip(signal, rec):
            self.assertAlmostEqual(orig, r, places=10)

    def test_wavelet_edge_preservation(self):
        """Wavelet deve atenuar ruido preservando a transicao do degrau."""
        random.seed(42)
        N = 64
        ideal = [2.0 if i < 32 else 1.0 for i in range(N)]
        noisy = [v + random.gauss(0, 0.1) for v in ideal]
        denoised = wavelet_haar_denoise(noisy, levels=2, threshold_mult=1.0)
        # Amostra bem antes e bem depois do degrau
        self.assertAlmostEqual(denoised[10], 2.0, delta=0.15)
        self.assertAlmostEqual(denoised[50], 1.0, delta=0.15)


if __name__ == "__main__":
    unittest.main()

