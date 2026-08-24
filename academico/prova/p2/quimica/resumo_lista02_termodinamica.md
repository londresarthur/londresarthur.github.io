# Termodinâmica Química e Eletroquímica — Guia Consolidado (Lista 02)

> **Disciplina:** 0323223 — Módulo de Fundamentos 4 (Química)  
> **Professor:** Prof. Sebastião Gomes dos Santos Filho  
> **Conteúdo:** 1ª e 2ª Leis da Termodinâmica, Energia Livre de Gibbs, Potencial Químico, Equilíbrio Químico, Atividade Iônica e Aplicação em Baterias (Equação de Nernst).

---

## Sumário

- [Tabela Rápida de Macetes](#tabela-rápida-de-macetes)
- [Questão 1 — Troca Reversível de Calor, Entropia e 1ª Lei](#questão-1--troca-reversível-de-calor-entropia-e-1ª-lei)
- [Questão 2 — Dedução da Equação Fundamental de Gibbs](#questão-2--dedução-da-equação-fundamental-de-gibbs)
- [Questão 3 — Potencial Químico, Avanço de Reação e Equilíbrio](#questão-3--potencial-químico-avanço-de-reação-e-equilíbrio)
- [Questão 4 — Dedução de μ = μ₀ + RT ln p para Gás Ideal](#questão-4--dedução-de-μ--μ₀--rt-ln-p-para-gás-ideal)
- [Conexão Teórica — De Gibbs à Eletroquímica](#conexão-teórica--de-gibbs-à-eletroquímica)
  - [Origem de ΔG = ΔG₀ + RT ln Q](#origem-de-δg--δg₀--rt-ln-q)
  - [Constante de Equilíbrio KE](#constante-de-equilíbrio-ke)
  - [Interações Coulombianas e Atividade Química](#interações-coulombianas-e-atividade-química)
- [Aplicação em Baterias — Equação de Nernst e Íon-Lítio](#aplicação-em-baterias--equação-de-nernst-e-íon-lítio)
  - [Legenda Completa de Nernst](#legenda-completa-de-nernst)
  - [Estudo de Caso: Bateria de Íon-Lítio](#estudo-de-caso-bateria-de-íon-lítio)
  - [Entendendo a Equação Estequiométrica Genérica](#entendendo-a-equação-estequiométrica-genérica)

---

## Tabela Rápida de Macetes

| Gatilho no Enunciado | Ponto de Partida | Pulo do Gato | Expressão Final |
| :--- | :--- | :--- | :--- |
| **Troca reversível com reservatório térmico** | $\Delta S = \frac{Q}{T}$ e $\Delta U = Q - W$ | Atenção aos sinais: $Q > 0$ (recebe calor), $W > 0$ (realiza trabalho) | $\Delta S = +0{,}714\text{ J/K}$<br>$\Delta U = +150\text{ J}$ |
| **Demonstrar dG = -S dT + V dp** | $G = U + pV - TS$ | Abre diferencial por regra do produto e substitui $dU = T\,dS - p\,dV$ | Termos cruzados cancelam $\to dG = -S\,dT + V\,dp$ |
| **Importância e interpretação de μ** | $\mu_i = \left(\frac{\partial G}{\partial n_i}\right)_{T,p,n_j}$ | Analogia das 3 forças motrizes ($T \to$ calor, $p \to$ volume, $\mu \to$ matéria) | Condição de equilíbrio químico: $\sum \nu_i \mu_i = 0$ |
| **Dedução de μ(p) para gás ideal** | $dG = V\,dp$ ($T = \text{cte}$) | Isola $V = \frac{nRT}{p}$, integra de $p^\circ=1$ até $p$ e divide por $n$ | $\mu = \mu^\circ + RT\ln p$ |
| **Voltagem da Bateria / Nernst** | $\Delta G = -nFE$ | Substitui $\Delta G$ na relação com $Q$ | $E = E^\circ - \frac{RT}{nF}\ln Q$ |

---

## Questão 1 — Troca Reversível de Calor, Entropia e 1ª Lei

```
+------------------------+             +---------------+             +---------------+
|  Reservatório Térmico  |  -- dQ -->  |   Sistema A   |  --  W  --> |   Sistema X   |
|     (T_R = 350 K)      |   (250 J)   | (Delta U = ?) |   (100 J)   |               |
+------------------------+             +---------------+             +---------------+
```

### Enunciado
Um dado sistema $A$ recebe calor $\Delta Q$ de um reservatório térmico $R$ e realiza trabalho $W$ sobre um sistema $X$. Supondo que a troca de calor entre o sistema $A$ e o reservatório térmico $R$ seja reversível, obtenha a variação de entropia do sistema $A$ sabendo-se que a temperatura do reservatório $T_R$ é de $350\text{ K}$ e a troca de calor $\Delta Q$ é de $250\text{ J}$. Se o sistema $A$ realiza trabalho $W = 100\text{ J}$ sobre o sistema $X$, obtenha a variação da energia interna do sistema $A$.

---

### Parte A: Variação de Entropia ($\Delta S_A$)

#### 1. Hipóteses e Definições
- **Reservatório Térmico:** Capacidade térmica infinita $\implies T_R = 350\text{ K} = \text{constante}$.
- **Troca Reversível:** $T_{\text{sist}} \approx T_R = 350\text{ K}$.

**Definição de Entropia de Clausius:**

$$
dS = \frac{\delta Q_{\text{rev}}}{T}
$$

- **Convenção de Sinal do Calor:** Como o sistema $A$ recebe calor, $Q_A = +250\text{ J}$.

#### 2. Cálculo

$$
\Delta S_A = \frac{Q_A}{T_R} = \frac{+250\text{ J}}{350\text{ K}} = \frac{5}{7}\text{ J/K} \approx +0{,}714\text{ J/K}
$$

> **Nota:** Para o reservatório $R$, que cedeu $250\text{ J}$, $\Delta S_R = \frac{-250}{350} = -0{,}714\text{ J/K}$. Assim, $\Delta S_{\text{universo}} = \Delta S_A + \Delta S_R = 0$, comprovando a reversibilidade termodinâmica.

---

### Parte B: Variação da Energia Interna ($\Delta U_A$)

#### 1. Primeira Lei da Termodinâmica

$$
Q = \Delta U + W \implies \Delta U = Q - W
$$

- $Q = +250\text{ J}$ (calor absorvido pelo sistema $A$).
- $W = +100\text{ J}$ (trabalho realizado pelo sistema $A$ sobre $X$).

#### 2. Cálculo

$$
\Delta U_A = 250\text{ J} - 100\text{ J} = +150\text{ J}
$$

> **Significado Físico:** O sistema absorveu $250\text{ J}$ de calor, gastou $100\text{ J}$ realizando trabalho mecânico sobre $X$ e reteve $150\text{ J}$ como aumento de sua própria energia interna.

---

## Questão 2 — Dedução da Equação Fundamental de Gibbs

### Enunciado
Demonstre que a equação fundamental da energia de Gibbs de sistemas formados por misturas de composição fixa é dada por:

$$
dG = -S\,dT + V\,dp
$$

---

### Passo a Passo da Demonstração

#### 1. Definição da Energia Livre de Gibbs

$$
G = U + pV - TS
$$

#### 2. Diferencial Total (Regra do Produto da Derivação)
Como $U, p, V, T, S$ são funções de estado diferenciáveis:

$$
dG = dU + (p\,dV + V\,dp) - (T\,dS + S\,dT)
$$

$$
dG = dU + p\,dV + V\,dp - T\,dS - S\,dT \qquad \text{--- (*)}
$$

#### 3. Primeira Lei da Termodinâmica
Para transformações infinitesimais com trabalho apenas mecânico de expansão/compressão ($\delta W = p\,dV$):

$$
\delta Q = dU + p\,dV \implies dU = \delta Q - p\,dV \qquad \text{--- (**)}
$$

#### 4. Segunda Lei da Termodinâmica (Processo Reversível)
Pela definição de entropia para processos reversíveis:

$$
dS = \frac{\delta Q_{\text{rev}}}{T} \implies \delta Q_{\text{rev}} = T\,dS \qquad \text{--- (***)}
$$

5. **Equação Fundamental da Energia Interna:**
   Substituindo $(***)$ em $(**)$:

$$
dU = T\,dS - p\,dV
$$

6. **Substituição em dG e Cancelamento:**
   Substituindo $dU$ na equação $(*)$:

$$
dG = (T\,dS - p\,dV) + p\,dV + V\,dp - T\,dS - S\,dT
$$

   - $+T\,dS$ cancela com $-T\,dS$
   - $-p\,dV$ cancela com $+p\,dV$

   Resultando na equação fundamental:

$$
dG = -S\,dT + V\,dp
$$

> **Por que esse resultado é central na Química?**  
> Porque para composição fixa, a energia de Gibbs depende apenas de $T$ e $p$ ($G = G(T,p)$), que são exatamente as variáveis mais fáceis de controlar e medir em laboratório.

---

## Questão 3 — Potencial Químico, Avanço de Reação e Equilíbrio

### Enunciado
Qual a importância do potencial químico? Qual a sua interpretação?

---

### 1. Definição Formal (Sistemas de Composição Variável)
Quando o número de mols $n_1, n_2, \dots, n_k$ varia (por reação química ou transporte de massa entre fases), a diferencial de $G(T, p, n_1, \dots, n_k)$ é:

$$
dG = -S\,dT + V\,dp + \sum_i \left(\frac{\partial G}{\partial n_i}\right)_{T, p, n_{j \neq i}} dn_i
$$

Define-se o **Potencial Químico ($\mu_i$)** como:

$$
\mu_i \equiv \left(\frac{\partial G}{\partial n_i}\right)_{T, p, n_{j \neq i}}
$$

Equação fundamental completa:

$$
dG = -S\,dT + V\,dp + \sum_i \mu_i\,dn_i
$$

- **Conceito:** É a **energia de Gibbs molar parcial** da espécie $i$ (variação de $G$ total do sistema ao adicionar $1\text{ mol}$ de $i$, mantendo $T, p$ e as quantidades das demais substâncias fixas).

---

### 2. Interpretação Física (Analogia das Forças Motrizes)

| Potencial (Força Motriz) | O que ele impulsiona? | Sentido do Fluxo Espontâneo |
| :--- | :--- | :--- |
| **Temperatura ($T$)** | Fluxo de **Calor** | Do corpo de **maior $T$** $\to$ **menor $T$** |
| **Pressão ($p$)** | Fluxo de **Volume / Mecânico** | Da região de **maior $p$** $\to$ **menor $p$** |
| **Potencial Elétrico ($\phi$)** | Fluxo de **Carga Elétrica** | Do ponto de **maior potencial** $\to$ **menor potencial** |
| **Potencial Químico ($\mu_i$)** | Fluxo de **Matéria / Reação Química** | Da região/fase de **maior $\mu_i$** $\to$ **menor $\mu_i$** |

---

### 3. Importância Prática

#### A) Equilíbrio de Fases
Em duas fases em equilíbrio ($\alpha$ e $\beta$, ex: líquido e vapor):

$$
\mu_i^{(\alpha)} = \mu_i^{(\beta)}
$$

#### B) Condição de Equilíbrio Químico (Grau de Avanço $\xi$)
Em uma reação $\sum \nu_i A_i = 0$, onde os coeficientes estequiométricos $\nu_i$ são negativos para reagentes e positivos para produtos:
- Ao avançar de $d\xi$ mols de reação: $dn_i = \nu_i \, d\xi$.

A $T$ e $p$ constantes:

$$
dG = \sum_i \mu_i \cdot (\nu_i \, d\xi) = \left( \sum_i \nu_i \mu_i \right) d\xi
$$

No equilíbrio, a energia de Gibbs é mínima ($\frac{dG}{d\xi} = 0$), logo:

$$
\sum_i \nu_i \mu_i = 0
$$

---

## Questão 4 — Dedução de μ = μ₀ + RT ln p para Gás Ideal

### Enunciado
Supondo uma solução química ideal formada por um único composto, equivalente a um gás ideal numa pressão $p$, dentro de um dado sistema isolado, e considerando a temperatura constante na expressão $dG = - S\,dT + V\,dp$, mostre que o potencial químico do composto único pode ser escrito na forma:

$$
\mu = \frac{G}{n} = \mu^\circ + RT\ln p
$$

Utilize na dedução a equação de Clapeyron: $pV = nRT$ para gases ideais.

---

### Demonstração Direta em 4 Passos

#### Passo 1: Temperatura constante ($T = \text{cte} \implies dT = 0$)

$$
dG = -S\,dT + V\,dp \implies dG = V\,dp
$$

#### Passo 2: Substituindo o volume dos gases ideais ($pV = nRT \implies V = \frac{nRT}{p}$)

$$
dG = \frac{nRT}{p}\,dp
$$

#### Passo 3: Integrando do estado padrão ($p^\circ = 1$, $G^\circ$) até a pressão genérica ($p$, $G$)

$$
\int_{G^\circ}^{G} dG = nRT \int_{1}^{p} \frac{dp}{p}
$$

$$
G - G^\circ = nRT (\ln p - \ln 1) = nRT \ln p
$$

$$
G = G^\circ + nRT \ln p
$$

#### Passo 4: Dividindo tudo por $n$ (pois $\mu = \frac{G}{n}$ e $\mu^\circ = \frac{G^\circ}{n}$)

$$
\frac{G}{n} = \frac{G^\circ}{n} + \frac{nRT \ln p}{n}
$$

$$
\mu = \mu^\circ + RT\ln p
$$

---

## Conexão Teórica — De Gibbs à Eletroquímica

### Origem de ΔG = ΔG₀ + RT ln Q
Para cada constituinte $i$ em uma mistura:

$$
\mu_i = \mu_i^\circ + RT \ln a_i
$$

Aplicando na variação de Gibbs da reação ($\Delta G = \sum \nu_i \mu_i$):

$$
\Delta G = \sum_i \nu_i \left( \mu_i^\circ + RT \ln a_i \right) = \sum_i \nu_i \mu_i^\circ + RT \sum_i \ln(a_i^{\nu_i})
$$

Pelas propriedades dos logaritmos ($\sum \ln x = \ln \prod x$), define-se o **Quociente Reacional ($Q$)**:

$$
\Delta G = \Delta G^\circ + RT \ln Q \qquad \text{onde } Q = \prod_i a_i^{\nu_i}
$$

---

### Constante de Equilíbrio KE
Quando o sistema atinge o equilíbrio químico ($\Delta G = 0$), o quociente $Q$ atinge o valor da constante $K_E$:

$$
0 = \Delta G^\circ + RT \ln K_E \implies \Delta G^\circ = -RT \ln K_E \implies K_E = e^{-\frac{\Delta G^\circ}{RT}}
$$

- **Se $K_E \gg 1$ ($\Delta G^\circ < 0$):** Produtos fortemente favorecidos (reação espontânea).
- **Se $K_E \ll 1$ ($\Delta G^\circ > 0$):** Reagentes fortemente favorecidos.
- **Se $K_E \approx 1$ ($\Delta G^\circ \approx 0$):** Reação balanceada, produtos e reagentes em quantidades comparáveis, alta sensibilidade ao deslocamento de equilíbrio.

---

### Interações Coulombianas e Atividade Química

Em soluções iônicas reais (eletrólitos):
1. Cátions e ânions sofrem **forças eletrostáticas de atração e repulsão de Coulomb** ($F = \frac{k |q_1 q_2|}{r^2}$).
2. Forma-se uma **nuvem iônica** ao redor de cada íon, reduzindo sua mobilidade e capacidade de reagir livremente.
3. A **concentração efetiva** (que realmente reage) é menor que a concentração nominal $x_i$.

Introduz-se a **Atividade Química ($a_i$)**:

$$
a_i = f_i \cdot x_i
$$

onde $f_i \le 1$ é o **coeficiente de atividade**.

---

## Aplicação em Baterias — Equação de Nernst e Íon-Lítio

### Legenda Completa de Nernst

Como o trabalho elétrico útil de uma pilha é $\Delta G = -nFE$ e $\Delta G^\circ = -nFE^\circ$:

$$
E = E^\circ - \frac{RT}{nF} \ln Q
$$

A $25^\circ\text{C}$ ($298{,}15\text{ K}$), usando logaritmo decimal:

$$
E = E^\circ - \frac{0{,}0592}{n} \log_{10} Q
$$

| Símbolo | Nome | Significado Físico | Unidade (SI) |
| :---: | :--- | :--- | :--- |
| **$E$** | Potencial da Célula | Tensão / ddp instantânea da bateria em funcionamento | $\text{V}$ *(Volts)* |
| **$E^\circ$** | Potencial Padrão | Voltagem de referência nas condições padrão ($25^\circ\text{C}, 1\text{ bar}, a_i = 1$) | $\text{V}$ |
| **$R$** | Constante dos Gases | $8{,}314$ | $\text{J}\cdot\text{mol}^{-1}\cdot\text{K}^{-1}$ |
| **$T$** | Temperatura Absoluta | Escala Kelvin ($T_{\text{K}} = T_{^\circ\text{C}} + 273{,}15$) | $\text{K}$ |
| **$n$** | Elétrons Trocados | Quantidade de mols de $e^-$ transferidos na reação balanceada | $\text{adimensional}$ |
| **$F$** | Constante de Faraday | Carga elétrica de $1\text{ mol}$ de elétrons ($\approx 96.485$) | $\text{C/mol}$ |
| **$Q$** | Quociente Reacional | Razão instantânea entre atividades de produtos e reagentes | $\text{adimensional}$ |

---

### Estudo de Caso: Bateria de Íon-Lítio

```
[ ÂNODO (Grafite) ]                    [ ELETRÓLITO ]                    [ CÁTODO (Cobalto) ]
   LiC6 (Lítio preso)  -----( Li+ viaja no líquido )----->  CoO2 + Li+  --->  LiCoO2
         |                                                                      ^
         +--- [ e- ] ---> [ Circuito do Celular ] ---> [ e- ] ------------------+
```

#### Reações de Descarga
- **Ânodo (-):** $\text{LiC}_6 \rightleftharpoons \text{C}_6 + \text{Li}^+ + 1\,e^-$
- **Cátodo (+):** $\text{CoO}_2 + \text{Li}^+ + 1\,e^- \rightleftharpoons \text{LiCoO}_2$
- **Global:** $\text{LiC}_6 + \text{CoO}_2 \rightleftharpoons \text{C}_6 + \text{LiCoO}_2 \quad (n = 1, E^\circ \approx 3{,}70\text{ V})$

#### Quociente Reacional

$$
Q = \frac{a_{\text{LiCoO}_2} \cdot a_{\text{C}_6}}{a_{\text{LiC}_6} \cdot a_{\text{CoO}_2}} \approx \frac{\text{[Litio no Catodo]}}{\text{[Litio no Anodo]}}
$$

#### Comportamento da Tensão com o Uso
- **100% Carga:** Lítio concentrado no ânodo $\implies Q \approx 10^{-5} \implies E \approx 3{,}70 - 0{,}0592(-5) \approx +4{,}00\text{ V a } +4{,}20\text{ V}$.
- **50% Carga:** Quantidades equilibradas $\implies Q \approx 1 \implies \log_{10}(1) = 0 \implies E \approx +3{,}70\text{ V}$ (tensão nominal).
- **Descarga Total (0%):** Lítio migrou para o cátodo $\implies Q \approx 10^7 \implies E \approx 3{,}70 - 0{,}0592(7) \approx +3{,}29\text{ V}$ (limite de corte do circuito de proteção).
- **Bateria em Equilíbrio:** Se atingir $Q = K_E$, $\Delta G = 0 \implies E = 0\text{ V}$ (bateria completamente descarregada).

---

### Entendendo a Equação Estequiométrica Genérica

A expressão clássica:

$$
a\text{A} + b\text{B} \rightleftharpoons c\text{C} + d\text{D}
$$

Representa a proporção molar universal de uma reação:
- **Letras Maiúsculas ($\text{A}, \text{B}, \text{C}, \text{D}$):** As espécies químicas envolvidas ($\text{A}, \text{B} =$ reagentes; $\text{C}, \text{D} =$ produtos).
- **Letras Minúsculas ($a, b, c, d$):** Os coeficientes estequiométricos (quantidades de mols necessárias e formadas).
- **Símbolo $\rightleftharpoons$:** Indica reversibilidade e coexistência dinâmica entre reagentes e produtos.
- **Na convenção de coeficientes $\nu_i$:** Reagentes possuem $\nu_i < 0$ ($\nu_A = -a, \nu_B = -b$) e produtos possuem $\nu_i > 0$ ($\nu_C = +c, \nu_D = +d$), permitindo a forma compacta $\sum \nu_i \mu_i = 0$.
