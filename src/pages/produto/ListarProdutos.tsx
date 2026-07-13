import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import type Produto from "../../models/Produto";
import { buscar } from "../../service/Service";
import CardProduto from "../../components/produto/cardproduto/CardProduto";

function ListaProdutos() {

    const [isLoading, setIsLoading] = useState(false);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        buscarProdutos();
    }, [produtos.length]);

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
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#D22519"
                        size={20}
                    />
                </div>
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">

                    {!isLoading && produtos.length === 0 && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Produto foi encontrado!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {produtos.map((produto) => (
                            <CardProduto
                                key={produto.idProduto}
                                produto={produto}
                            />
                        ))}

                    </div>

                </div>
            </div>
        </>
    );
}

export default ListaProdutos;
