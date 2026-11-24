# ContaCerta

Site de um escritório contábil fictício, baseado no [protótipo do primeiro bimestre](https://www.figma.com/design/FO7CPkqZcYsJgLrd91JNIe/ContaCerta). Abra **index.html** no navegador após extrair a pasta completa. O site funciona offline, sem instalação.

## Como o projeto funciona

| Arquivo | Função |
| --- | --- |
| index.html | Apresenta o escritório, os benefícios e um gráfico ilustrativo construído com CSS. |
| servicos.html | Apresenta quatro serviços. Cada link leva a Contato com o serviço escolhido na URL. |
| contato.html | Reúne o formulário, a confirmação e a janela de atendimento. |
| css/estilo.css | Centraliza cores em variáveis e usa Grid, Flexbox e uma media query para adaptar as telas. |
| js/site.js | Controla o menu móvel, a seleção do serviço, o diálogo, a validação e a confirmação. |
| imagens/marca.svg | Símbolo da marca exportado do Figma. |

O formulário simula um pedido. Os dados existem apenas na página aberta. O botão de WhatsApp explica a indisponibilidade do canal do escritório fictício, como no protótipo.

## Roteiro para praticar a apresentação

1. **Mostre a página inicial.** No HTML, localize header, nav, main e footer. Aponte o link para a folha de estilos e explique por que o script usa defer.
2. **Reduza a janela para 390 px.** Compare as colunas e abra o menu. Localize a media query no CSS e o evento click no JavaScript. Explique como a classe aberto e o atributo aria-expanded mudam juntos.
3. **Escolha Folha de pagamento em Serviços.** Mostre o parâmetro servico=3 no endereço e o campo já selecionado. Localize URLSearchParams no código.
4. **Demonstre a validação.** Tente enviar vazio. Depois use o nome Ana Silva, e-mail ana@example.com, telefone 123 e uma mensagem. Mostre a validação do telefone, troque por (63) 99999-0000 e conclua. Explique a diferença entre required no HTML e setCustomValidity no JavaScript.
5. **Mostre a confirmação.** Explique como preventDefault evita recarregar a página, textContent exibe o resumo e hidden alterna as seções. Clique em Nova solicitação, abra o atendimento e feche com Escape.

**Exercício de domínio:** antes de apresentar, troque a cor de --lima no CSS, explique quais elementos mudaram e restaure a cor do Figma. Depois localize os dois pontos a alterar para acrescentar um serviço ao catálogo e ao formulário.

