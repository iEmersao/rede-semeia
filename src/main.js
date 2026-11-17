import "./style.css";
import { verificarSaude } from "./api.js";
import { telaDoacoes, telaNovaDoacao } from "./pages/doacoes.js";
import { telaDoadores } from "./pages/doadores.js";

const app = document.querySelector("#app");
const statusApi = document.querySelector("#status-api");
const statusBanco = document.querySelector("#status-banco");
const statusHora = document.querySelector("#status-hora");
const formatarHorario = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "medium",
});

const rotas = {
  "#/doadores": telaDoadores,
  "#/doacoes/nova": telaNovaDoacao,
  "#/doacoes": telaDoacoes,
};

async function navegar() {
  const rota = rotas[location.hash] ? location.hash : "#/doadores";
  for (const link of document.querySelectorAll("nav a")) {
    if (link.getAttribute("href") === rota) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  await rotas[rota](app);
}

async function atualizarSaude() {
  try {
    const saude = await verificarSaude();
    statusApi.textContent = `Status da API: ${saude.status}`;
    statusBanco.textContent = `Banco: ${saude.banco}`;
    statusHora.textContent = `Verificado às ${formatarHorario.format(new Date(saude.hora))}`;
    statusHora.dateTime = saude.hora;
    statusApi.classList.toggle("is-ok", saude.status === "ok");
    statusBanco.classList.toggle("is-ok", saude.banco === "ok");
    statusBanco.classList.toggle("is-error", saude.banco !== "ok");
  } catch {
    statusApi.textContent = "Status da API: fora do ar";
    statusBanco.textContent = "Banco: sem resposta";
    statusHora.textContent = `Verificado às ${formatarHorario.format(new Date())}`;
    statusApi.classList.add("is-error");
    statusBanco.classList.add("is-error");
  }
}

window.addEventListener("hashchange", () => void navegar());
void navegar();
void atualizarSaude();
