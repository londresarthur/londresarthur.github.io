"""
================================================================================
SIMULADOR DIDÁTICO EXPANDIDO: EDOs ESCALARES E VETORIAIS (1ª E 2ª ORDEM)
Método de Euler e Método de Taylor de 2ª Ordem
================================================================================
"""

import numpy as np


def metodo_euler(f, t0, y0, tf, h):
    """
    Resolve numericamente o PVI escalar ou vetorial y' = f(t, y) pelo Método de Euler Explícito.
    """
    n_passos = int(round((tf - t0) / h))
    t = np.linspace(t0, tf, n_passos + 1)
    
    y0_arr = np.array(y0, dtype=float)
    if y0_arr.ndim == 0:
        y = np.zeros(n_passos + 1)
        y[0] = y0_arr
        for n in range(n_passos):
            y[n + 1] = y[n] + h * f(t[n], y[n])
    else:
        y = np.zeros((n_passos + 1, len(y0_arr)))
        y[0] = y0_arr
        for n in range(n_passos):
            y[n + 1] = y[n] + h * np.array(f(t[n], y[n]), dtype=float)
            
    return t, y


def metodo_taylor_ordem2(f, f_prime, t0, y0, tf, h):
    """
    Resolve numericamente o PVI escalar ou vetorial y' = f(t, y) pelo Método de Taylor 2ª Ordem.
    """
    n_passos = int(round((tf - t0) / h))
    t = np.linspace(t0, tf, n_passos + 1)
    
    y0_arr = np.array(y0, dtype=float)
    if y0_arr.ndim == 0:
        y = np.zeros(n_passos + 1)
        y[0] = y0_arr
        for n in range(n_passos):
            yp = f(t[n], y[n])
            ypp = f_prime(t[n], y[n])
            y[n + 1] = y[n] + h * yp + (h**2 / 2.0) * ypp
    else:
        y = np.zeros((n_passos + 1, len(y0_arr)))
        y[0] = y0_arr
        for n in range(n_passos):
            yp = np.array(f(t[n], y[n]), dtype=float)
            ypp = np.array(f_prime(t[n], y[n]), dtype=float)
            y[n + 1] = y[n] + h * yp + (h**2 / 2.0) * ypp
            
    return t, y


if __name__ == "__main__":
    print("\n" + "=" * 80)
    print(f"{'EXECUÇÃO DOS 6 EXEMPLOS NUMÉRICOS':^80}")
    print("=" * 80)

    # Exemplo 1: Escalar 1ª Ordem (y' = 2t - y)
    t1, y1 = metodo_euler(lambda t, y: 2*t - y, 0.0, 1.0, 0.3, 0.1)
    print("\n--> Exemplo 1 (Escalar 1ª Ordem: y' = 2t - y):")
    for n in range(len(t1)):
        exato = 2*t1[n] - 2 + 3*np.exp(-t1[n])
        print(f"  n={n} | t={t1[n]:.1f} | y_Euler={y1[n]:.6f} | y_Exato={exato:.6f} | Erro={abs(exato-y1[n]):.6f}")

    # Exemplo 2: Vetorial 1ª Ordem (Sistema Oscilador 2x2)
    t2, y2 = metodo_euler(lambda t, y: [y[1], -y[0]], 0.0, [1.0, 0.0], 0.2, 0.1)
    print("\n--> Exemplo 2 (Sistema 1ª Ordem 2x2: y1' = y2, y2' = -y1):")
    for n in range(len(t2)):
        ex1, ex2 = np.cos(t2[n]), -np.sin(t2[n])
        print(f"  n={n} | t={t2[n]:.1f} | y1_Euler={y2[n,0]:.6f} (Ex: {ex1:.6f}) | y2_Euler={y2[n,1]:.6f} (Ex: {ex2:.6f})")

    # Exemplo 3: Escalar 2ª Ordem Reduzida (Oscilador Amortecido)
    t3, y3 = metodo_euler(lambda t, u: [u[1], -2*u[0] - 3*u[1]], 0.0, [1.0, 0.0], 0.2, 0.1)
    print("\n--> Exemplo 3 (EDO 2ª Ordem Escalar Amortecida: y'' + 3y' + 2y = 0):")
    for n in range(len(t3)):
        ex_y = 2*np.exp(-t3[n]) - np.exp(-2*t3[n])
        print(f"  n={n} | t={t3[n]:.1f} | y_Euler={y3[n,0]:.6f} (Ex: {ex_y:.6f}) | y'_Euler={y3[n,1]:.6f}")

    # Exemplo 4: Vetorial 2ª Ordem Reduzida a 4D (Massas Acopladas)
    t4, y4 = metodo_euler(lambda t, u: [u[1], -2*u[0] + u[2], u[3], u[0] - 2*u[2]], 0.0, [1.0, 0.0, 0.0, 0.0], 0.1, 0.1)
    print("\n--> Exemplo 4 (EDO 2ª Ordem Vetorial / Massas Acopladas 4D em t=0.1):")
    print(f"  x(0.1)={y4[1,0]:.4f}, x'(0.1)={y4[1,1]:.4f}, y(0.1)={y4[1,2]:.4f}, y'(0.1)={y4[1,3]:.4f}")

    # Exemplo 5: Taylor 2ª Ordem Escalar (y' = t*y + 1)
    f5 = lambda t, y: t*y + 1.0
    f5_p = lambda t, y: y*(1.0 + t**2) + t
    t5, y5 = metodo_taylor_ordem2(f5, f5_p, 0.0, 1.0, 0.2, 0.1)
    print("\n--> Exemplo 5 (Taylor 2ª Ordem: y' = t*y + 1):")
    for n in range(len(t5)):
        print(f"  n={n} | t={t5[n]:.1f} | y_Taylor2={y5[n]:.6f}")

    # Exemplo 6: EDO 2ª Ordem Não-Linear (Pêndulo Simples Euler vs Taylor 2)
    f6 = lambda t, u: [u[1], -np.sin(u[0])]
    f6_p = lambda t, u: [-np.sin(u[0]), -u[1]*np.cos(u[0])]
    t6_e, y6_e = metodo_euler(f6, 0.0, [np.pi/6, 0.0], 0.1, 0.1)
    t6_t, y6_t = metodo_taylor_ordem2(f6, f6_p, 0.0, [np.pi/6, 0.0], 0.1, 0.1)
    print("\n--> Exemplo 6 (Pendulo Simples Nao-Linear: Euler vs Taylor 2 em t=0.1):")
    print(f"  Euler   : theta(0.1) = {y6_e[1,0]:.6f} rad | omega(0.1) = {y6_e[1,1]:.6f} rad/s")
    print(f"  Taylor 2: theta(0.1) = {y6_t[1,0]:.6f} rad | omega(0.1) = {y6_t[1,1]:.6f} rad/s")
    print("=" * 80 + "\n")
