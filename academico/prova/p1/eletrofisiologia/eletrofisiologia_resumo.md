<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./eletrofisiologia_resumo.md) | [🎯 Roteiro de Resolução](./eletrofisiologia_roteiro.md) | [📝 Lista de Exercícios](./eletrofisiologia_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# Resumo Teórico: Introdução à Eletrofisiologia e Biopotenciais

> [!IMPORTANT]
> **Objetivo:** Dominar os mecanismos biogênicos da atividade elétrica celular, Equações de Nernst e Goldman, fases do Potencial de Ação e fisiopatologia eletrolítica/farmacológica.

---

## 1. Origem dos Biopotenciais Celulares

Os biopotenciais elétricos (como o ECG no coração e o EEG no cérebro) surgem da **separação de cargas elétricas** através da membrana plasmática hidrofóbica (bicamada fosfolipídica).
- **Meio Extracelular:** Rico em íons Sódio ($\text{Na}^+ \approx 140 \text{ mM}$) e Cloreto ($\text{Cl}^- \approx 100 \text{ mM}$).
- **Meio Intracelular:** Rico em íons Potássio ($\text{K}^+ \approx 140 \text{ mM}$) e Ânions Proteicos imóveis ($\text{A}^-$).
- **Capacitância da Membrana:** A bicamada fosfolipídica atua como um capacitor elétrico dielétrico.

---

## 2. Equação de Nernst: Potencial de Equilíbrio Iônico

Calcula o potencial elétrico transmembrana em que a força de gradiente de concentração de um único íon é exatamente equilibrada pela força eletrostática oposta.

$$
E_{\text{ion}} = \frac{R \cdot T}{z \cdot F} \ln \left( \frac{[\text{Íon}]_{\text{fora}}}{[\text{Íon}]_{\text{dentro}}} \right)
$$

A $37\text{ }^\circ\text{C}$ ($310{,}15\text{ K}$) e convertendo para logaritmo de base 10:

$$
E_{\text{ion}} = \frac{61{,}54}{z} \log_{10} \left( \frac{[\text{Íon}]_{\text{fora}}}{[\text{Íon}]_{\text{dentro}}} \right) \quad [\text{mV}]
$$

> [!NOTE]
> **Legenda dos termos da Equação de Nernst:**
> - $E_{\text{ion}}$: Potencial de equilíbrio eletroquímico do íon (em $\text{mV}$ ou $\text{V}$).
> - $R$: Constante universal dos gases perfeitos ($8{,}314 \text{ J}/(\text{mol}\cdot\text{K})$).
> - $T$: Temperatura absoluta em Kelvin ($\text{K}$); a $37\text{ }^\circ\text{C}$, $T = 310{,}15 \text{ K}$.
> - $z$: Valência ou carga elétrica do íon ($+1$ para $\text{Na}^+$, $\text{K}^+$; $+2$ para $\text{Ca}^{2+}$; $-1$ para $\text{Cl}^-$).
> - $F$: Constante de Faraday ($96.485 \text{ C/mol}$, carga total por mol de cargas unitárias).
> - $[\text{Íon}]_{\text{fora}}$: Concentração molar do íon no meio extracelular ($\text{mM}$ ou $\text{mol/L}$).
> - $[\text{Íon}]_{\text{dentro}}$: Concentração molar do íon no meio intracelular ($\text{mM}$ ou $\text{mol/L}$).
> - $61{,}54$: Fator simplificado a $37\text{ }^\circ\text{C}$ resultante de $\frac{R \cdot T}{F} \cdot \ln(10) \cdot 1000 \approx 61{,}54 \text{ mV}$.

> [!TIP]
> **Valores Típicos a 37 °C:**
> - $E_{\text{K}^+} \approx -95 \text{ mV}$ (força o interior a ficar negativo).
> - $E_{\text{Na}^+} \approx +61{,}5 \text{ mV}$ (força o interior a ficar positivo).
> - $E_{\text{Cl}^-} \approx -65 \text{ mV}$.

---

## 3. Equação de Goldman-Hodgkin-Katz (GHK): Potencial de Repouso da Membrana ($V_m$)

Como a membrana celular é permeável a múltiplos íons ao mesmo tempo, o potencial de repouso $V_m$ depende das concentrações e das **permeabilidades relativas ($P_{\text{ion}}$)** de cada íon:

$$
V_m = \frac{R T}{F} \ln \left( \frac{P_{\text{Na}}[\text{Na}^+]_{\text{fora}} + P_{\text{K}}[\text{K}^+]_{\text{fora}} + P_{\text{Cl}}[\text{Cl}^-]_{\text{dentro}}}{P_{\text{Na}}[\text{Na}^+]_{\text{dentro}} + P_{\text{K}}[\text{K}^+]_{\text{dentro}} + P_{\text{Cl}}[\text{Cl}^-]_{\text{fora}}} \right)
$$

> [!NOTE]
> **Legenda dos termos da Equação de GHK:**
> - $V_m$: Potencial elétrico de repouso da membrana (em $\text{mV}$ ou $\text{V}$).
> - $R$: Constante universal dos gases perfeitos ($8{,}314 \text{ J}/(\text{mol}\cdot\text{K})$).
> - $T$: Temperatura absoluta em Kelvin ($\text{K}$).
> - $F$: Constante de Faraday ($96.485 \text{ C/mol}$).
> - $P_{\text{Na}}, P_{\text{K}}, P_{\text{Cl}}$: Permeabilidades relativas da membrana aos íons $\text{Na}^+$, $\text{K}^+$ e $\text{Cl}^-$, respectivamente.
> - $[\text{Na}^+]_{\text{fora}}, [\text{K}^+]_{\text{fora}}, [\text{Cl}^-]_{\text{fora}}$: Concentrações extracelulares dos respetivos íons ($\text{mM}$).
> - $[\text{Na}^+]_{\text{dentro}}, [\text{K}^+]_{\text{dentro}}, [\text{Cl}^-]_{\text{dentro}}$: Concentrações intracelulares dos respetivos íons ($\text{mM}$).
>   *(Observação: a concentração de $\text{Cl}^-$ fica invertida — dentro no numerador e fora no denominador — devido à sua valência negativa $z = -1$).*

> [!NOTE]
> **No Repouso:** A permeabilidade ao potássio é muito maior do que ao sódio ($P_{\text{K}} \gg P_{\text{Na}}$, cerca de $40:1$). Por isso, o potencial de repouso da célula ($V_m \approx -70 \text{ mV}$ a $-80 \text{ mV}$) fica muito próximo do potencial de equilíbrio de Nernst do potássio ($E_{\text{K}}$).

---

## 4. Fases do Potencial de Ação (PA)

```mermaid
graph LR
    A["1. Estímulo ao Limiar"] --> B["2. Despolarização Rápida Na+"]
    B --> C["3. Inativação dos Canais Na+"]
    C --> D["4. Repolarização K+"]
    D --> E["5. Hiperpolarização Transitória"]
    E --> F["6. Retorno ao Repouso via Bomba Na+/K+"]
```

1. **Estímulo Inicial / Limiar:** Despolarização local atinge cerca de $-55 \text{ mV}$.
2. **Despolarização Rápida:** Abertura rápida dos canais de $\text{Na}^+$ voltagem-dependentes. Entrada massiva de $\text{Na}^+$ para o interior celular ($V_m$ sobe até $+30 \text{ mV}$).
3. **Inativação dos Canais de $\text{Na}^+$:** Fechamento das portas de inativação (comportão $h$) dos canais de sódio.
4. **Repolarização:** Abertura tardia dos canais de $\text{K}^+$ voltagem-dependentes. Saída massiva de $\text{K}^+$ para o meio extracelular, restaurando a negatividade interior.
5. **Hiperpolarização Transitória (Undershoot):** Canais de $\text{K}^+$ demoram a fechar, fazendo $V_m$ ficar temporariamente mais negativo do que no repouso (próximo a $-90 \text{ mV}$).
6. **Restauração do Repouso:** A **Bomba $\text{Na}^+/\text{K}^+$ ATPase** transporta ativamente $3\text{ Na}^+$ para fora e $2\text{ K}^+$ para dentro, consumindo ATP.

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./eletrofisiologia_resumo.md) | [🎯 Roteiro de Resolução](./eletrofisiologia_roteiro.md) | [📝 Lista de Exercícios](./eletrofisiologia_exercicios.md) | [🔝 Voltar ao Topo](#topo)
