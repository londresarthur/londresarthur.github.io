# 📖 Catálogo de Presets e Coeficientes Analíticos USP

> **Quadrante Diátaxis:** Reference (Orientado à Informação Técnica)  
> **Fonte:** Apostilas de Cálculo Avançado e Física Matemática — USP

---

## Tabela de Presets Canônicos

| ID | Nome & Fórmula | Semiperíodo $L$ | Modo | Coeficientes Analíticos |
| :--- | :--- | :--- | :--- | :--- |
| `abs_x` | $f(x) = \|x\|$ | $\pi$ | `full` | $a_0 = \pi$, $a_{2k-1} = \frac{-4}{\pi(2k-1)^2}$, $b_n = 0$ |
| `pi_minus_x_odd` | $f(x) = \pi - x$ (Senos) | $\pi$ | `odd_sine` | $a_0 = 0$, $a_n = 0$, $b_n = \frac{2}{n}$ |
| `pi_minus_x_even` | $f(x) = \pi - x$ (Cossenos) | $\pi$ | `even_cosine` | $a_0 = \pi$, $a_{2k-1} = \frac{4}{\pi(2k-1)^2}$, $b_n = 0$ |
| `pi_minus_x_direct` | $f(x) = \pi - x$ (Direta) | $\pi$ | `full` | $a_0 = 2\pi$, $a_n = 0$, $b_n = \frac{2(-1)^n}{n}$ |
| `square_wave` | $f(x) = \text{sgn}(x)$ | $\pi$ | `full` | $a_0 = 0$, $a_n = 0$, $b_{2k-1} = \frac{4}{\pi(2k-1)}$ |
| `sawtooth_wave` | $f(x) = x$ | $\pi$ | `full` | $a_0 = 0$, $a_n = 0$, $b_n = \frac{2(-1)^{n+1}}{n}$ |
| `causal_pulse` | Pulso em $[0, 1]$ | $2$ | `full` | $a_0 = \frac{1}{2}$, $a_n = \frac{\sin(n\pi/2)}{n\pi}$, $b_n = \frac{1 - \cos(n\pi/2)}{n\pi}$ |
| `triangle_wave` | $f(x) = \frac{\pi}{2} - \|x\|$ | $\pi$ | `full` | $a_0 = 0$, $a_{2k-1} = \frac{4}{\pi(2k-1)^2}$, $b_n = 0$ |
| `exp_decay` | $f(x) = e^{-\|x\|}$ | $\pi$ | `full` | $a_0 = \frac{2(1 - e^{-\pi})}{\pi}$, $a_n = \frac{2(-1)^n \sinh(\pi)}{\pi(1 + n^2)}$, $b_n = 0$ |
| `rectified_sine` | $f(x) = \|\sin(x)\|$ | $\pi$ | `full` | $a_0 = \frac{4}{\pi}$, $a_{2k} = \frac{-4}{\pi(4k^2 - 1)}$, $b_n = 0$ |
| `quadratic` | $f(x) = x^2$ | $\pi$ | `full` | $a_0 = \frac{2\pi^2}{3}$, $a_n = \frac{4(-1)^n}{n^2}$, $b_n = 0$ |
