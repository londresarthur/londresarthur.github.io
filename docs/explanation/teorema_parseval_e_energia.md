# 💡 Explicação Teórica: Conservação de Energia & Teorema de Parseval

> **Quadrante Diátaxis:** Explanation (Orientado ao Entendimento e Teoria)  
> **Tema:** Espaços de Hilbert $L^2$, Ortogonalidade, Desigualdade de Bessel e Identidade de Parseval

---

## 1. O Teorema de Pitágoras em Dimensão Infinita

No espaço euclidiano tridimensional $\mathbb{R}^3$, o comprimento ao quadrado de um vetor $\vec{v} = c_1 \hat{i} + c_2 \hat{j} + c_3 \hat{k}$ em uma base ortonormal é dado pelo Teorema de Pitágoras:

$$
\lVert \vec{v} \rVert^2 = c_1^2 + c_2^2 + c_3^2
$$

No espaço de funções de quadrado integrável $L^2[-L, L]$, munido do produto interno:

$$
\langle f, g \rangle = \int_{-L}^L f(x)g(x)\,dx
$$

a norma ao quadrado (que representa a energia total do sinal) equivale à soma das energias de suas projeções ortogonais nos elementos da base trigonométrica.

---

## 2. A Identidade de Parseval

Seja $f \in L^2[-L, L]$ com coeficientes de Euler-Fourier $\{a_n, b_n\}$. Então vale a igualdade exata:

$$
\frac{1}{L}\int_{-L}^L [f(x)]^2\,dx = \frac{a_0^2}{2} + \sum_{n=1}^\infty (a_n^2 + b_n^2)
$$

### A Desigualdade de Bessel
Para qualquer soma parcial truncada com ordem $N$ finita, temos:

$$
E_N = \frac{a_0^2}{2} + \sum_{n=1}^N (a_n^2 + b_n^2) \le E_{\text{original}}
$$

O erro quadrático médio residual ($\text{MSE}$) decresce monotonicamente com o aumento de $N$:

$$
\text{MSE}_N = \frac{1}{L}\int_{-L}^L [f(x) - S_N(x)]^2\,dx = E_{\text{original}} - E_N \xrightarrow{N \to \infty} 0
$$

---

## 3. Aplicação na Série de Basel e Somas Notáveis da USP

Aplicando a Identidade de Parseval na função $f(x) = |x|$ em $[-\pi, \pi]$ com coeficientes $a_0 = \pi$ e $a_{2k-1} = \frac{-4}{\pi(2k-1)^2}$:

#### Passo 1: Energia no domínio do tempo

$$
E_{\text{orig}} = \frac{1}{\pi}\int_{-\pi}^\pi |x|^2\,dx = \frac{2}{\pi}\int_0^\pi x^2\,dx = \frac{2\pi^2}{3}
$$

#### Passo 2: Energia pela Série de Fourier

$$
E_{\text{Fourier}} = \frac{\pi^2}{2} + \sum_{k=1}^\infty \left( \frac{-4}{\pi(2k-1)^2} \right)^2 = \frac{\pi^2}{2} + \frac{16}{\pi^2}\sum_{k=1}^\infty \frac{1}{(2k-1)^4}
$$

#### Passo 3: Igualando por Parseval

$$
\frac{2\pi^2}{3} = \frac{\pi^2}{2} + \frac{16}{\pi^2}\sum_{k=1}^\infty \frac{1}{(2k-1)^4} \implies \sum_{k=1}^\infty \frac{1}{(2k-1)^4} = \frac{\pi^4}{96}
$$

Daí deduz-se diretamente o valor da soma de todas as quartas potências:

$$
\sum_{n=1}^\infty \frac{1}{n^4} = \frac{\pi^4}{90}
$$
