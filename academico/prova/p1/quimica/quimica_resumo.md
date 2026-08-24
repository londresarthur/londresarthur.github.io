<a id="topo"></a>

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./quimica_resumo.md) | [🎯 Roteiro de Resolução](./quimica_roteiro.md) | [📝 Lista de Exercícios](./quimica_exercicios.md) | [🚨 Plano de Emergência](../plano_estudos_emergencia.md)
---

# Resumo Teórico: Química de Semicondutores e Processos Microeletrônicos

> [!IMPORTANT]
> **Objetivo:** Dominar os fundamentos químicos da fabricação de circuitos integrados: Oxidação Seca de Silício, Polimento Químico-Mecânico (CMP), Reações Redox e Eletrodeposição de Cobre por Leis de Faraday.

---

## 1. Oxidação Seca de Silício ($\text{Si} + \text{O}_2 \to \text{SiO}_2$)

Na fabricação de microchips, o dióxido de silício ($\text{SiO}_2$) é crescido sobre a lâmina de silício ($\text{Si}$) para atuar como isolante elétrico ou dielétrico de porta.
- **Mecanismo:** Os átomos de oxigênio reagem diretamente com a superfície do substrato de silício.
- **Relação de Consumo de Substrato:** Como os átomos de $\text{Si}$ do substrato são incorporados ao $\text{SiO}_2$, a espessura de silício consumido ($x_{\text{Si}}$) é menor do que a espessura de $\text{SiO}_2$ formada ($x_{\text{SiO}_2}$).
- **Fórmula de Conservação:**

$$
x_{\text{Si}} = \frac{d_{\text{SiO}_2} \cdot N_A \cdot x_{\text{SiO}_2}}{M_{\text{SiO}_2} \cdot NV_{\text{Si}}}
$$

> [!NOTE]
> ### 📋 Legenda de Símbolos, Grandezas e Análise Dimensional
> 
> | Símbolo | Grandeza / Descrição Física | Unidades Usuais (SI) | Dimensão Física ($[M, L, T, N]$) |
> | :--- | :--- | :--- | :--- |
> | **$x_{\text{Si}}$** | Espessura de Silício ($\text{Si}$) consumido no substrato | $\text{nm}$ ($\text{cm}$, $\text{m}$) | $[L]$ (Comprimento) |
> | **$x_{\text{SiO}_2}$** | Espessura de Óxido de Silício ($\text{SiO}_2$) crescida | $\text{nm}$ ($\text{cm}$, $\text{m}$) | $[L]$ (Comprimento) |
> | **$d_{\text{SiO}_2}$** | Densidade mássica do $\text{SiO}_2$ | $\text{g/cm}^3$ ($\text{kg/m}^3$) | $[M \cdot L^{-3}]$ (Massa / Volume) |
> | **$d_{\text{Si}}$** | Densidade mássica do $\text{Si}$ cristalino | $\text{g/cm}^3$ ($\text{kg/m}^3$) | $[M \cdot L^{-3}]$ (Massa / Volume) |
> | **$M_{\text{SiO}_2}$** | Massa molar do $\text{SiO}_2$ ($60{,}08\text{ g/mol}$) | $\text{g/mol}$ ($\text{kg/mol}$) | $[M \cdot N^{-1}]$ (Massa / Quant. Matéria) |
> | **$M_{\text{Si}}$** | Massa molar do Silício ($28{,}08\text{ g/mol}$) | $\text{g/mol}$ ($\text{kg/mol}$) | $[M \cdot N^{-1}]$ (Massa / Quant. Matéria) |
> | **$N_A$** | Constante de Avogadro ($6{,}022 \times 10^{23}$) | $\text{atomos/mol}$ ($\text{mol}^{-1}$) | $[N^{-1}]$ (Quantidade de Matéria inversa) |
> | **$NV_{\text{Si}}$** | Densidade atômica do $\text{Si}$ ($5 \times 10^{22}$) | $\text{atomos/cm}^3$ ($\text{m}^{-3}$) | $[L^{-3}]$ (Volume inverso) |
> 
> **Verificação de Consistência Dimensional:**

$$
\text{Dimensao}[x_{\text{Si}}] = \frac{\left[\frac{M}{L^3}\right] \cdot \left[\frac{1}{N}\right] \cdot [L]}{\left[\frac{M}{N}\right] \cdot \left[\frac{1}{L^3}\right]} = \frac{\frac{M \cdot L}{L^3 \cdot N}}{\frac{M}{N \cdot L^3}} = [L] \quad (\text{Comprimento em cm ou nm})
$$

---

## 2. Processo Dual Damascene e Polimento Químico-Mecânico (CMP)

O processo **Dual Damascene** é a tecnologia padrão para a fabricação de interconexões de Cobre ($\text{Cu}$) em circuitos integrados.

### Mecanismos do CMP de Cobre:
O CMP combina simultaneamente dois efeitos sinérgicos em uma pasta abrasiva (slurry):
1. **Mecanismo Químico:** A pasta contém um agente oxidante (como água oxigenada $\text{H}_2\text{O}_2$) em meio ácido que reage com a superfície do cobre metálico ($\text{Cu}^0$), convertendo-a em uma camada macia de óxido/hidróxido de cobre ($\text{Cu}^{2+}$).
2. **Mecanismo Mecânico:** Partículas abrasivas nanométricas (sílica $\text{SiO}_2$ ou alumina $\text{Al}_2\text{O}_3$) suspensas na solução e pressionadas por um feltro rotativo desgastam mecanicamente a camada macia de óxido apenas nos relevos elevados, nivelando perfeitamente a superfície (planarização).

---

## 3. Balanceamento Redox pelo Método Íon-Elétron

Em soluções ácidas com $\text{H}_2\text{O}_2$, o cobre metálico é oxidado:
- **Semi-reação de Oxidação:** $\text{Cu}^0 \to \text{Cu}^{2+} + 2e^-$
- **Semi-reação de Redução:** $\text{H}_2\text{O}_2 + 2\text{H}^+ + 2e^- \to 2\text{H}_2\text{O}$
- **Reação Global Balanceada:** $\text{Cu} + \text{H}_2\text{O}_2 + 2\text{H}^+ \to \text{Cu}^{2+} + 2\text{H}_2\text{O}$

---

## 4. Eletrodeposição de Cobre e 1ª Lei de Faraday

Na eletrodeposição (eletroformação), íons $\text{Cu}^{2+}$ em solução de $\text{CuSO}_4$ são reduzidos no catodo (eletrodo de trabalho) ao receberem elétrons fornecidos por uma fonte externa:

$$
\text{Cu}^{2+} + 2e^- \to \text{Cu}^0
$$

> [!NOTE]
> ### Equações Fundamentais:
> - **Carga elétrica total ($Q$):** $Q = I \cdot t$ (onde $I$ é a corrente em Amperes e $t$ o tempo em segundos).
> - **Constante de Faraday ($F$):** $F = q \cdot N_A \approx 96485 \text{ C/mol}$ (carga de 1 mol de elétrons).
> - **Massa depositada ($m$):**

$$
m = \frac{M \cdot Q}{n \cdot F} = \frac{M \cdot I \cdot t}{n \cdot F}
$$

>   ($n = 2$ para $\text{Cu}^{2+}$, $M = 63{,}55 \text{ g/mol}$).
> - **Espessura depositada ($\Delta x$):**

$$
\Delta x = \frac{V}{A} = \frac{m}{d_{\text{Cu}} \cdot A}
$$

> - **Taxa de Deposição ($v_{\text{dep}}$):**

$$
v_{\text{dep}} = \frac{\Delta x}{t}
$$

---
> **Navegação Rápida:**  
> [⬅️ Voltar ao README](../README.md) | [📘 Resumo Teórico](./quimica_resumo.md) | [🎯 Roteiro de Resolução](./quimica_roteiro.md) | [📝 Lista de Exercícios](./quimica_exercicios.md) | [🔝 Voltar ao Topo](#topo)
