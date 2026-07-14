import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Produto from "../../models/Produto";
import { buscar } from "../../service/Service";
import CardProduto from "../../components/produto/cardproduto/CardProduto";

function ListaProdutos() {

    const [isLoading, setIsLoading] = useState(false);
    const [produtos, setProdutos] = useState<(Produto & { id?: string | number })[]>([]);
    const [recomendados, setRecomendados] = useState<(Produto & { id?: string | number })[]>([]);

    useEffect(() => {
        buscarProdutos();
    }, []);

    useEffect(() => {
        const organicosVeganos = produtos.filter(
            (produto) =>
                produto.categoria?.categoriaVegano ||
                produto.categoria?.categoriaOrganico
        );

        // Sorteia até 3 produtos aleatoriamente entre os orgânicos/veganos
        const sorteados = [...organicosVeganos]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        setRecomendados(sorteados);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [produtos]);

    async function buscarProdutos() {
        try {
            setIsLoading(true);
            await buscar("/produtos", setProdutos);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full bg-[#F0E7D6] py-4">

            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#D22519"
                        size={20}
                    />
                </div>
            )}

            <div className="flex justify-center w-full">
                <div className="container flex flex-col">

                    {!isLoading && produtos.length === 0 && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Produto foi encontrado!
                        </span>
                    )}

                    {!isLoading && recomendados.length > 0 && (
                        <div className="mb-10">
                            <h2
                                className="text-2xl uppercase text-[#D22519] mb-6"
                                style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                            >
                                Recomendamos os produtos orgânicos e veganos da sua lista
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recomendados.map((produto) => (
                                    <CardProduto
                                        key={`recomendado-${produto.id}`}
                                        produto={produto}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {!isLoading && produtos.length > 0 && (
                        <h2
                            className="text-2xl uppercase text-[#D22519] mb-6"
                            style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                        >
                            Produtos:
                        </h2>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {produtos.map((produto) => (
                            <CardProduto
                                key={produto.id}
                                produto={produto}
                            />
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ListaProdutos;