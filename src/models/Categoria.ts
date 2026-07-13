import type Produto from "./Produto";

export default interface Categoria {
    id?: number;
    tipo: string;
    categoriaVegano: boolean;
    categoriaOrganico: boolean;
    descricao: string;
    produtos?: Produto[];
}