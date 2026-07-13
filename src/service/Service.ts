import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const buscar = async (url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

export const cadastrar = async (url: string, dados: object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const atualizar = async (url: string, dados: object, setDados: Function) => {
  const resposta = await api.put(url, dados);
  setDados(resposta.data);
};

export const deletar = async (url: string) => {
  await api.delete(url);
};
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function buscar(
  url: string,
  setDados: Function
) {
  const resposta = await api.get(url);
  setDados(resposta.data);
}

export async function buscarPorId(
  url: string,
  setDados: Function
) {
  const resposta = await api.get(url);
  setDados(resposta.data);
}

export async function cadastrar(
  url: string,
  dados: Object,
  setDados: Function
) {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
}

export async function atualizar(
  url: string,
  dados: Object,
  setDados: Function
) {
  const resposta = await api.put(url, dados);
  setDados(resposta.data);
}

export async function deletar(
  url: string
) {
  await api.delete(url);
}
