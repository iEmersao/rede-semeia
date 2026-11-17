import { atualizarDoador, criarDoador, excluirDoador, listarDoadores } from "../api.js";
import { el, esconderMensagem, estado, mostrarMensagem } from "../ui.js";

export async function telaDoadores(app) {
  app.innerHTML = `
    <div class="abertura-tela">
      <div><p class="sobretitulo"><span></span>COMUNIDADE SEMEIA</p><h1>Quem faz a diferença</h1>
      <p class="descricao-tela">Cada gesto começa com uma pessoa. Cuide da sua rede de doadores por aqui.</p></div>
      <div class="abertura-ilustracao" aria-hidden="true"><span class="ilustracao-sol"></span><span class="ilustracao-folha folha-um"></span><span class="ilustracao-folha folha-dois"></span><span class="ilustracao-haste"></span><span class="ilustracao-chao"></span></div>
    </div>
    <div class="layout-doadores">
      <form id="form-doador" class="cartao">
        <div class="cartao-cabecalho"><span class="cartao-icone" aria-hidden="true">＋</span><div><p class="rotulo-cartao">FAÇA PARTE</p><h2 id="titulo-form">Novo doador</h2></div></div>
        <label>
          Nome
          <input name="nome" required maxlength="150" autocomplete="name" />
        </label>
        <label>
          E-mail <span class="opcional">(opcional)</span>
          <input name="email" type="email" maxlength="100" autocomplete="email" />
        </label>
        <label>
          Telefone <span class="opcional">(opcional)</span>
          <input name="telefone" type="tel" maxlength="20" autocomplete="tel" />
        </label>
        <div class="acoes">
          <button type="submit">Salvar</button>
          <button type="button" id="cancelar" class="secundario" hidden>Cancelar edição</button>
        </div>
        <p id="msg-form" class="mensagem" role="status" hidden></p>
      </form>

      <section class="secao-lista" aria-labelledby="titulo-lista-doadores">
        <div class="secao-cabecalho"><div><p class="rotulo-cartao">NOSSA REDE</p><h2 id="titulo-lista-doadores">Doadores cadastrados</h2></div><span class="selo-lista">Pessoas que semeiam</span></div>
        <p id="resumo-doadores" class="resumo-lista" aria-live="polite"></p>
        <p id="msg-lista" class="mensagem" role="status" hidden></p>
        <ul id="lista-doadores" class="lista"></ul>
      </section>
    </div>
  `;

  const form = app.querySelector("#form-doador");
  const titulo = app.querySelector("#titulo-form");
  const botaoSalvar = form.querySelector('button[type="submit"]');
  const botaoCancelar = app.querySelector("#cancelar");
  const msgForm = app.querySelector("#msg-form");
  const msgLista = app.querySelector("#msg-lista");
  const resumo = app.querySelector("#resumo-doadores");
  const lista = app.querySelector("#lista-doadores");
  let editandoId = null; // null: cadastrando. Um número: editando esse doador.

  async function carregar() {
    lista.replaceChildren(estado("Carregando..."));
    try {
      const doadores = await listarDoadores();
      if (doadores.length === 0) {
        resumo.textContent = "";
        lista.replaceChildren(estado("Nenhum doador cadastrado ainda."));
        return;
      }
      resumo.textContent = `${doadores.length} ${doadores.length === 1 ? "pessoa conectada" : "pessoas conectadas"} à Rede Semeia`;
      lista.replaceChildren(...doadores.map(cartaoDoador));
    } catch (erro) {
      lista.replaceChildren();
      mostrarMensagem(msgLista, erro.message, "erro");
    }
  }

  function cartaoDoador(doador) {
    return el(
      "li",
      { class: "cartao cartao-doador" },
      el("span", { class: "avatar-doador", "aria-hidden": "true" }, doador.nome.trim().charAt(0).toLocaleUpperCase("pt-BR")),
      el("strong", { class: "nome-doador" }, doador.nome),
      el("span", { class: "detalhe" }, doador.email ?? "sem e-mail"),
      el("span", { class: "detalhe" }, doador.telefone ?? "sem telefone"),
      el(
        "div",
        { class: "acoes" },
        el(
          "button",
          { type: "button", class: "secundario", onclick: () => editar(doador) },
          "Editar",
        ),
        el(
          "button",
          { type: "button", class: "perigo", onclick: () => excluir(doador) },
          "Excluir",
        ),
      ),
    );
  }

  function editar(doador) {
    editandoId = doador.id_doador;
    form.elements.nome.value = doador.nome;
    form.elements.email.value = doador.email ?? "";
    form.elements.telefone.value = doador.telefone ?? "";
    titulo.textContent = `Editar ${doador.nome}`;
    botaoCancelar.hidden = false;
    esconderMensagem(msgForm);
    form.scrollIntoView({ behavior: "smooth" });
    form.elements.nome.focus();
  }

  function limparFormulario() {
    editandoId = null;
    form.reset();
    titulo.textContent = "Novo doador";
    botaoCancelar.hidden = true;
  }

  async function excluir(doador) {
    if (!confirm(`Excluir ${doador.nome}?`)) return;
    esconderMensagem(msgLista);
    try {
      await excluirDoador(doador.id_doador);
      mostrarMensagem(msgLista, `${doador.nome} foi excluído.`);
      if (editandoId === doador.id_doador) limparFormulario();
      await carregar();
    } catch (erro) {
      mostrarMensagem(msgLista, erro.message, "erro");
    }
  }

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // sem isso, o navegador recarrega a página
    const dados = Object.fromEntries(new FormData(form)); // { nome, email, telefone }

    botaoSalvar.disabled = true; // evita cadastro duplicado por clique duplo
    esconderMensagem(msgForm);
    try {
      if (editandoId) {
        await atualizarDoador(editandoId, dados);
        mostrarMensagem(msgForm, "Doador atualizado.");
      } else {
        const novo = await criarDoador(dados);
        mostrarMensagem(msgForm, `${novo.nome} foi cadastrado.`);
      }
      limparFormulario();
      await carregar();
    } catch (erro) {
      mostrarMensagem(msgForm, erro.message, "erro");
    } finally {
      botaoSalvar.disabled = false;
    }
  });

  botaoCancelar.addEventListener("click", () => {
    limparFormulario();
    esconderMensagem(msgForm);
  });

  await carregar();
}

