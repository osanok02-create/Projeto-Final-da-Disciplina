// O HTML carrega este arquivo com defer, então os elementos já existem quando o script começa.
// querySelector procura um elemento na página. O ponto indica uma classe e o # indica um id.
const menu = document.querySelector(".menu");
const navegacao = document.querySelector("#navegacao");

// addEventListener registra uma função para executar a cada clique no botão Menu.
menu.addEventListener("click", () => {
  // toggle alterna a classe "aberto" e devolve true quando ela fica presente.
  // No celular, a regra CSS .topo nav.aberto torna os links visíveis.
  const aberto = navegacao.classList.toggle("aberto");
  // Atualiza também o estado anunciado pelos leitores de tela ("true" ou "false").
  menu.setAttribute("aria-expanded", String(aberto));
});

// Em Início e Serviços a busca devolve null. Em Contato ela encontra o formulário de orçamento.
const formulario = document.querySelector("#orcamento");

// Este script é compartilhado pelas páginas. Apenas Contato possui o formulário.
if (formulario) {
  // A desestruturação cria referências aos controles pelos atributos name do HTML.
  const { nome, telefone, servico, mensagem } = formulario.elements;
  // Guarda a seção de sucesso e a janela de atendimento para poder mostrá-las ou ocultá-las.
  const confirmacao = document.querySelector("#confirmacao");
  const dialogo = document.querySelector("dialog");
  // Lê o parâmetro servico no endereço. Por exemplo, em contato.html?servico=3, o valor é o texto "3".
  const escolha = new URLSearchParams(location.search).get("servico");

  // Array.from transforma as opções do select em uma lista. some verifica se alguma tem o valor recebido.
  // Assim, um clique em “Folha de pagamento” no catálogo já deixa esse serviço selecionado em Contato.
  if (Array.from(servico.options).some(opcao => opcao.value === escolha)) {
    servico.value = escolha;
  }

  // Esta função é usada por dois botões. hidden alterna a visibilidade e focus leva o teclado ao campo Nome.
  function mostrarFormulario() {
    confirmacao.hidden = true;
    formulario.hidden = false;
    nome.focus();
  }

  // showModal abre o aviso de atendimento e restringe a interação à janela enquanto ela estiver aberta.
  document.querySelector("#abrir-chat").addEventListener("click", () => dialogo.showModal());
  // O botão Fechar chama close para dispensar o aviso.
  document.querySelector("#fechar").addEventListener("click", () => dialogo.close());
  // “Ir para o formulário” fecha o aviso e reaproveita a função que exibe e focaliza o formulário.
  document.querySelector("#usar-formulario").addEventListener("click", () => {
    dialogo.close();
    mostrarFormulario();
  });
  // Passar a função sem parênteses faz com que ela seja executada somente quando houver um clique.
  document.querySelector("#novo").addEventListener("click", mostrarFormulario);

  // O evento input chega ao formulário quando um campo é editado. evento.target é o campo alterado.
  // A mensagem vazia limpa o erro personalizado anterior para permitir uma nova tentativa.
  formulario.addEventListener("input", evento => evento.target.setCustomValidity(""));
  // O navegador verifica primeiro as regras do HTML, como required e type="email".
  // Quando elas permitem o envio, o evento submit aciona as verificações abaixo.
  formulario.addEventListener("submit", evento => {
    // Impede o envio padrão e o recarregamento da página. O pedido é uma simulação local.
    evento.preventDefault();
    // replace remove espaços, parênteses e hífens em todas as ocorrências (g).
    // Por exemplo, (63) 99999-0000 vira 63999990000 apenas na variável usada para validar.
    const numero = telefone.value.replace(/[\s()-]/g, "");
    // trim ignora espaços nas pontas. O operador condição ? valorA : valorB escolhe a mensagem.
    // Um nome com menos de dois caracteres recebe um erro; uma mensagem vazia libera o campo.
    nome.setCustomValidity(nome.value.trim().length < 2 ? "Informe um nome com pelo menos duas letras." : "");
    // A expressão regular exige de 10 a 11 dígitos do início (^) ao fim ($). test devolve true ou false.
    telefone.setCustomValidity(/^\d{10,11}$/.test(numero) ? "" : "Informe DDD e telefone, com 10 ou 11 dígitos.");
    // Se restarem apenas espaços, trim devolve texto vazio e o campo recebe a mensagem de erro.
    mensagem.setCustomValidity(mensagem.value.trim() ? "" : "Descreva o que você precisa.");
    // reportValidity mostra ao visitante o primeiro campo inválido. Se devolver false, return interrompe o envio.
    if (!formulario.reportValidity()) return;

    // Lê o rótulo visível da opção selecionada, como “Folha de pagamento”, para compor o resumo.
    const descricao = servico.selectedOptions[0].textContent;
    // textContent insere o nome e o serviço no resumo como texto, mesmo que o visitante digite símbolos de HTML.
    document.querySelector("#resumo").textContent = nome.value.trim() + ", seu pedido de " + descricao + " foi simulado.";
    // Depois de montar o resumo, restaura os valores iniciais dos campos para o próximo pedido.
    formulario.reset();
    // Troca o formulário pela confirmação e leva o foco ao resultado para quem navega pelo teclado.
    formulario.hidden = true;
    confirmacao.hidden = false;
    confirmacao.focus();
  });
}
