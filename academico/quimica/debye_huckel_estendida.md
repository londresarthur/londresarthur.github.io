# 🧪 Guia Rápido: Equação de Debye-Hückel Estendida

A **Equação de Debye-Hückel Estendida** é a formulação eletrostática utilizada para estimar o **coeficiente de atividade** ($\gamma$) de íons em soluções de força iônica moderada ($0{,}01\text{ M} < I \le 0{,}10\text{ M}$).

Diferente da *Lei Limite* (que assume íons como cargas pontuais infinitesimais), este modelo incorpora o **tamanho finito (diâmetro efetivo) do íon hidratado ($\alpha_i$)**.

---

## 1. Formulismo Matemático

### 1.1 Coeficiente de Atividade Individual do Íon $i$

$$
\log_{10}(\gamma_i) = - \frac{A \cdot z_i^2 \cdot \sqrt{I}}{1 + B \cdot \alpha_i \cdot \sqrt{I}}
$$

* Com $\alpha_i$ em Picômetros ($\text{pm}$): $\log_{10}(\gamma_i) = - \frac{0{,}509 \cdot z_i^2 \cdot \sqrt{I}}{1 + \frac{\alpha_i \sqrt{I}}{305}}$
* Com $\alpha_i$ em Angströms ($\text{Å}$): $\log_{10}(\gamma_i) = - \frac{0{,}509 \cdot z_i^2 \cdot \sqrt{I}}{1 + 0{,}329 \cdot \alpha_i \sqrt{I}}$

---

### 1.2 Coeficiente de Atividade Médio ($\gamma_\pm$)
Para um eletrólito simétrico dissociado:

$$
\log_{10}(\gamma_\pm) = - \frac{A \cdot |z_+ \cdot z_-| \cdot \sqrt{I}}{1 + B \cdot \alpha \cdot \sqrt{I}}
$$

---

## 2. Tabela de Grandezas e Legenda de Termos

| Símbolo | Significado / Termo | Papel Físico | Grandeza Física | Unidade no SI | Unidades Usuais |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **$\gamma_i$** | Coeficiente de atividade individual | Desvio da idealidade termodinâmica | Adimensional | $1$ | Adimensional |
| **$\gamma_\pm$** | Coeficiente de atividade médio | Média geométrica cátion-ânion | Adimensional | $1$ | Adimensional |
| **$z_i$** | Número de carga (valência formal) | Carga do íon $i$ em unidades de $e$ | Adimensional | $1$ | $+1, +2, -1, -2$, etc. |
| **$z_+, z_-$** | Cargas dos íons do sal | Valências do cátion e ânion | Adimensional | $1$ | Inteiros |
| **$I$** | Força Iônica | Efeito cumulativo do campo elétrico | Concentração efetiva | $\text{mol}\cdot\text{m}^{-3}$ | $\text{mol}\cdot\text{L}^{-1}$ ($\text{M}$) ou $\text{mol}\cdot\text{kg}^{-1}$ |
| **$\alpha_i$** | Diâmetro efetivo hidratado | Esfera de hidratação do íon | Comprimento | $\text{m}$ | $\text{pm}$, $\text{nm}$ ou $\text{Å}$ |
| **$A$** | Constante de Debye-Hückel | Termo dielétrico e térmico global | Parâmetro do meio | $\text{m}^{3/2}\cdot\text{mol}^{-1/2}$ | $0{,}509\text{ L}^{1/2}\cdot\text{mol}^{-1/2}$ ($25^\circ\text{C}$, água) |
| **$B$** | Parâmetro eletrostático | Proporcionalidade de blindagem | Parâmetro do meio | $\text{m}^{1/2}\cdot\text{mol}^{-1/2}$ | $0{,}329\text{ Å}^{-1}\cdot\text{M}^{-1/2}$ ($25^\circ\text{C}$, água) |

---

## 3. Definição da Força Iônica ($I$)

$$
I = \frac{1}{2} \sum_{i=1}^{n} c_i \cdot z_i^2
$$

* $c_i$: Concentração molar do íon $i$ ($\text{mol}\cdot\text{L}^{-1}$).
* $z_i$: Carga formal do íon $i$.

---

## 4. Origem Analítica das Constantes Fundamentais $A$ e $B$

As constantes derivam do acoplamento entre a equação de Poisson e a distribuição de Boltzmann:

$$
A = \frac{e^3 \cdot N_A^2 \cdot \sqrt{2 \cdot \rho_0}}{2{,}3026 \cdot 8\pi \cdot (\varepsilon_0 \cdot \varepsilon_r \cdot R \cdot T)^{3/2}}
$$

$$
B = e \cdot \sqrt{\frac{2 \cdot N_A \cdot \rho_0}{\varepsilon_0 \cdot \varepsilon_r \cdot R \cdot T}}
$$

* $e = 1{,}6022 \times 10^{-19}\text{ C}$ (Carga elementar).
* $N_A = 6{,}0221 \times 10^{23}\text{ mol}^{-1}$ (Número de Avogadro).
* $\varepsilon_0 = 8{,}8542 \times 10^{-12}\text{ F}\cdot\text{m}^{-1}$ (Permissividade do vácuo).
* $\varepsilon_r = 78{,}54$ (Permissividade relativa da água a $25^\circ\text{C}$).
* $R = 8{,}3145\text{ J}\cdot\text{mol}^{-1}\cdot\text{K}^{-1}$ (Constante dos gases).
* $T = 298{,}15\text{ K}$ (Temperatura absoluta).
* $\rho_0 = 997\text{ kg}\cdot\text{m}^{-3}$ (Massa específica da água a $25^\circ\text{C}$).

---

## 5. Tabela Típica de Diâmetros Iônicos Hidratados ($\alpha_i$)

| $\alpha_i$ ($\text{pm}$) | $\alpha_i$ ($\text{Å}$) | Íons Típicos |
| :---: | :---: | :--- |
| **$900$** | $9{,}0$ | $\text{Al}^{3+}, \text{Fe}^{3+}, \text{Cr}^{3+}, \text{H}_3\text{O}^+, \text{Th}^{4+}$ *(máxima hidratação por alta densidade de carga)* |
| **$600$** | $6{,}0$ | $\text{Mg}^{2+}, \text{Be}^{2+}, \text{Ca}^{2+}, \text{Cu}^{2+}, \text{Zn}^{2+}, \text{Li}^+$ |
| **$450$** | $4{,}5$ | $\text{Sr}^{2+}, \text{Ba}^{2+}, \text{Pb}^{2+}, \text{CO}_3^{2-}, \text{SO}_4^{2-}$ |
| **$350$** | $3{,}5$ | $\text{Na}^+, \text{HCO}_3^-, \text{H}_2\text{PO}_4^-, \text{F}^-, \text{CH}_3\text{COO}^-$ (Acetato) |
| **$300$** | $3{,}0$ | $\text{K}^+, \text{Cl}^-, \text{Br}^-, \text{I}^-, \text{NO}_3^-, \text{NH}_4^+, \text{Cs}^+, \text{Ag}^+$ *(baixa hidratação)* |

---

## 6. Limites de Aplicabilidade

```text
  0                              0.01                           0.10 M                         > 0.5 M
  |-------------------------------|------------------------------|-------------------------------|---> Força Iônica (I)
   [ Solução Ideal: γ = 1        ]
   [ Lei Limite: Cargas pontuais ]
                                  [ D-H Estendida: Tamanho α    ]
                                                                 [ Equação de Davies / Pitzer   ]
```
