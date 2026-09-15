# Como Analisar Atenuação de Ruído e Atraso de Grupo

Este guia prático ensina como quantificar e otimizar o compromisso (*trade-off*) entre a redução do ruído estocástico e a distorção por atraso temporal introduzida por filtros de média móvel causal e centralizada.

---

## 1. Como Medir a Redução de Ruído na Prática

Ao projetar um sistema de aquisição com ruído aditivo branco e descorrelacionado de média nula, o objetivo primordial da média móvel é minimizar a potência de ruído residual.

### Procedimento no Simulador:
1. Defina o sinal como `Degrau Unitário` e ajuste a intensidade de ruído $\sigma = 0.20$.
2. Observe os valores no cartão **Métricas & Desempenho Teórico**:
   - Para $M = 4$, a redução teórica de variância é de $0.250$ (ou seja, $\frac{1}{M} = \frac{1}{4}$).
   - O desvio padrão de saída reduz para $\sigma_{\text{out}} = \frac{\sigma}{\sqrt{M}} = \frac{0.20}{2} = 0.10$.

O ganho de SNR em decibéis é calculado por:

$$
\Delta \text{SNR} = 10 \log_{10}(M) = 10 \log_{10}(4) \approx +6.02 \text{ dB}
$$

3. Alterne entre os botões $M = 2$, $M = 5$ e $M = 10$ e compare os valores experimentais de MSE (*Mean Squared Error*).

---

## 2. Como Medir o Atraso de Grupo (*Group Delay*)

O atraso de grupo mede o retardo temporal em amostras experimentado pelo envelope do sinal ao atravessar o filtro.

Para um filtro FIR causal simétrico de comprimento $M$:

$$
\tau_g = \frac{M - 1}{2} \text{ amostras}
$$

Para converter esse valor em tempo contínuo com período de amostragem $T_s$:

$$
\Delta t = \tau_g \cdot T_s = \frac{M - 1}{2} \cdot \frac{T_{\text{total}}}{N - 1}
$$

### Como Eliminar o Atraso com Filtro Centralizado:
Caso a aplicação seja de pós-processamento (*offline* ou em lote), selecione a opção `Média Móvel Centralizada (Fase Zero)` no seletor de filtros.

A média utiliza amostras passadas e futuras de forma simétrica:

$$
y[n] = \frac{1}{M} \sum_{k=-\lfloor(M-1)/2\rfloor}^{\lfloor M/2\rfloor} x[n+k]
$$

O atraso de grupo passa a ser nulo ($\tau_g = 0$), centralizando a resposta transitória perfeitamente sobre o degrau original.

---

## 3. Como Preservar a Borda do Degrau Usando Wavelet

A maior limitação da média móvel é a dispersão temporal da transição do degrau em uma rampa de $M$ amostras.

### Procedimento com Wavelet:
1. No seletor de algoritmo, escolha `Denoising por Wavelets (DWT Haar + VisuShrink)`.
2. Configure **Níveis DWT** para $3$ e **Modo** para `Soft-Threshold`.
3. Compare o traçado obtido com a média móvel de $M = 10$:
   - O ruído sobre os patamares horizontais é atenuado de maneira comparável à média móvel.
   - O salto abrupto do degrau em $t = 5\text{ s}$ ocorre em uma única amostra ($t_r \approx 1$), sem atraso de grupo e sem arredondamento das quinas.

---

## 4. Como Rastrear o Degrau em Tempo Real com Filtro de Kalman

Quando a aplicação exige processamento estritamente causal em tempo real com rápida resposta ao degrau:

1. Selecione `Filtro de Kalman (Estimação Ótima Recursiva)`.
2. Ajuste o ruído de processo $Q$ para $0.0050$ e o ruído de medição $R$ para $0.0400$.
3. Observe como o ganho de Kalman adapta a largura de banda:
   - Em patamares estáveis, o ganho de Kalman reduz a variância do ruído com alta atenuação.
   - No instante do degrau, a grande inovação $(z_k - \hat{x}_k^-)$ força o estado a convergir muito mais depressa do que um filtro FIR causal equivalente.

---

## 5. Como Tratar Ruídos Impulsivos (*Outliers*)

Quando o sinal está corrompido por ruído do tipo impulsivo (picos esparsos de alta amplitude, como falhas de comunicação ou descargas atmosféricas):

1. Selecione o modelo de ruído `Impulsivo (Sal e Pimenta)` no simulador.
2. Note que a média móvel linear propaga o impacto do outlier por $M$ amostras sucessivas, gerando degraus indesejados.
3. Mude o tipo de filtro para `Filtro de Mediana`:
   - O filtro de mediana elimina totalmente os picos pontuais sem atenuar ou deformar os patamares estáveis do degrau.

---

## 6. Exportação dos Resultados Experimentais

Para documentar seus experimentos laboratoriais:
- Clique em **Exportar CSV** no cabeçalho superior para salvar a tabela com colunas `amostra, tempo_s, sinal_ideal, sinal_ruidoso, sinal_filtrado`.
- Clique em **Salvar Imagem** para baixar o gráfico em formato PNG de alta resolução.
