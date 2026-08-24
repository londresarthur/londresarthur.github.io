# 📖 Referência da API: Classe `FourierEngine`

> **Quadrante Diátaxis:** Reference (Orientado à Informação Técnica)  
> **Arquivo-fonte:** `src/js/fourier-engine.js`

---

## 1. Construtor

```javascript
const engine = new FourierEngine(options);
```

### Parâmetros (`options`)

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `L` | `number` | `Math.PI` | Semiperíodo do intervalo fundamental $[-L, L]$. |
| `N` | `number` | `10` | Ordem harmônica máxima (número de termos na série truncada). |
| `mode` | `string` | `'full'` | Modo de extensão: `'full'`, `'even_cosine'` ou `'odd_sine'`. |
| `presetId` | `string` | `'abs_x'` | Identificador do preset inicial a ser carregado. |
| `expression` | `string` | `'abs(x)'` | Fórmula matemática da função. |

---

## 2. Propriedades de Estado

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `coefficients.a0` | `number` | Coeficiente $a_0 = \frac{1}{L}\int_{-L}^L f(x)\,dx$. |
| `coefficients.a` | `Float64Array` | Array $[a_0, a_1, \dots, a_N]$ dos coeficientes dos cossenos. |
| `coefficients.b` | `Float64Array` | Array $[b_0, b_1, \dots, b_N]$ dos coeficientes dos senos ($b_0 = 0$). |
| `coefficients.magnitudes` | `Float64Array` | Amplitudes complexas $|c_n| = \frac{1}{2}\sqrt{a_n^2 + b_n^2}$. |
| `coefficients.harmonicEnergies` | `Float64Array` | Energias harmônicas individuais $e_n = a_n^2 + b_n^2$. |
| `energy.original` | `number` | Energia da função original $E_{\text{orig}} = \frac{1}{L}\int_{-L}^L [f(x)]^2\,dx$. |
| `energy.fourier` | `number` | Energia da série truncada $E_N = \frac{a_0^2}{2} + \sum_{n=1}^N (a_n^2 + b_n^2)$. |
| `energy.error` | `number` | Erro quadrático médio residual $\text{MSE} = \max(0, E_{\text{orig}} - E_N)$. |
| `energy.percentage` | `number` | Percentual de conservação de energia $\eta\% = (E_N / E_{\text{orig}}) \times 100$. |
| `discontinuities` | `Array<Object>` | Pontos de salto detectados: `{ x, left, right, jump, dirichletMidpoint }`. |
| `gibbsAnalysis` | `Array<Object>` | Análise de overshoot: `{ x, jump, overshootPercent, theoreticalGibbs }`. |

---

## 3. Métodos Principais

### `computeAll()`
Recalcula todos os coeficientes de Euler-Fourier, energias de Parseval, descontinuidades de Dirichlet e análise de Gibbs.

### `evalFourier(x, terms = this.N)`
Retorna o valor numérico de $S_N(x) = \frac{a_0}{2} + \sum_{n=1}^N [a_n \cos(\frac{n\pi x}{L}) + b_n \sin(\frac{n\pi x}{L})]$.

### `evalPeriodic(x)`
Retorna o valor da função original $f(x)$ estendida periodicamente para qualquer $x \in \mathbb{R}$.

### `toLatex(maxTerms = 6)`
Retorna a representação em string LaTeX formatada da série truncada para renderização no KaTeX.

### `getEpicyclesAt(x)`
Gera a cadeia de vetores fasoriais rotativos para a animação de epiciclos na coordenada $x$.
