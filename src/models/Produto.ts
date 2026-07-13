import type Categoria from "./Categoria";
import type Usuario from "./Usuario";

export default interface Produto {
    id?: number | string;
    idProduto?: number;
    nome: string;
    valor: number;
    marca: string;
    validade: string;
    usuario?: Usuario | null;
    categoria?: Categoria | null;
}