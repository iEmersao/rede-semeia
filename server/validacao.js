const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMATO_DATA = /^\d{4}-\d{2}-\d{2}$/;

function objetoValido(valor) {
  return valor !== null && typeof valor === "object" && !Array.isArray(valor);
}

function dataValida(valor) {
  if (typeof valor !== "string" || !FORMATO_DATA.test(valor)) return false;
  const data = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(data.getTime()) && data.toISOString().slice(0, 10) === valor;
}

export function validarDoador(dados) {
  if (!objetoValido(dados)) return "Envie os dados do doador em formato JSON";
  const { nome, email, telefone } = dados;
  if (typeof nome !== "string" || nome.trim() === "") return "Nome é obrigatório";
  if (nome.trim().length > 150) return "Nome deve ter no máximo 150 caracteres";
  if (email != null && email !== "") {
    if (typeof email !== "string" || !FORMATO_EMAIL.test(email.trim())) return "E-mail inválido";
    if (email.trim().length > 100) return "E-mail deve ter no máximo 100 caracteres";
  }
  if (telefone != null && telefone !== "") {
    if (typeof telefone !== "string") return "Telefone inválido";
    if (telefone.trim().length > 20) return "Telefone deve ter no máximo 20 caracteres";
  }
  return null;
}

export function validarDoacao(dados) {
  if (!objetoValido(dados)) return "Envie os dados da doação em formato JSON";
  const { id_doador, data_doacao, itens, observacao } = dados;
  if (!Number.isInteger(id_doador) || id_doador < 1) {
    return "id_doador é obrigatório e deve ser um número inteiro positivo";
  }
  if (!dataValida(data_doacao)) return "data_doacao deve ser uma data válida no formato AAAA-MM-DD";
  if (observacao != null && (typeof observacao !== "string" || observacao.length > 255)) {
    return "Observação deve ter no máximo 255 caracteres";
  }
  if (!Array.isArray(itens) || itens.length === 0) return "Informe pelo menos um item";
  for (const item of itens) {
    if (!objetoValido(item) || !Number.isInteger(item.id_item) || item.id_item < 1) {
      return "Cada item precisa de um id_item inteiro positivo";
    }
    if (!Number.isInteger(item.quantidade) || item.quantidade < 1) {
      return "A quantidade de cada item deve ser um inteiro maior que zero";
    }
  }
  const ids = itens.map((item) => item.id_item);
  if (new Set(ids).size !== ids.length) return "O mesmo item aparece mais de uma vez";
  return null;
}
