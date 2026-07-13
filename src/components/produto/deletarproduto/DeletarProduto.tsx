import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../service/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarProduto() {

    const navigate = useNavigate();

    const [produto, setProduto] = useState<Produto>({} as Produto);

    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, (dados: Produto) => {
                console.log("Produto encontrado:", dados);
                setProduto(dados);
            });

        } catch (error) {
            ToastAlerta("Erro ao buscar o produto.", "erro");
        }
    }

    useEffect(() => {
        if (id) {
            buscarPorId(id);
        }
    }, [id]);


    async function deletarProduto() {
        setIsLoading(true);

        try {
            await deletar(`/produtos/${id}`);

            ToastAlerta("Produto deletado com sucesso!", "sucesso");

            retornar();

        } catch (error) {
            ToastAlerta("Erro ao deletar o produto.", "erro");
        }

        setIsLoading(false);
    }


    function retornar() {
        navigate("/produtos");
    }


    return (
        <main className="bg-[#F0E7D6] min-h-[80vh] flex items-center justify-center px-4">

            <div className="w-full max-w-sm">

                <h1
                    className="mb-4 text-center text-2xl uppercase text-[#D22519]"
                    style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                >
                    Deletar Produto
                </h1>


                <p
                    className="mb-5 text-center text-sm font-semibold text-[#2D2D2D]"
                    style={{ fontFamily: "'Karla', sans-serif" }}
                >
                    Você tem certeza que deseja apagar este produto?
                </p>


                <div className="overflow-hidden rounded-2xl shadow-md">

                    <header
                        className="bg-[#D22519] px-4 py-3 text-left text-lg uppercase text-[#FDFDF5]"
                        style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                    >
                        Produto
                    </header>


                    <div className="flex items-center justify-between bg-[#9DBDB8] px-4 py-4">

                        <p
                            className="text-base font-semibold text-[#D22519]"
                            style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                        >
                            {produto.nome}
                        </p>


                        <p
                            className="text-base font-bold text-[#D22519]"
                            style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                        >
                            R$ {produto.valor?.toFixed(2)}
                        </p>

                    </div>


                    <div className="flex">

                        <button
                            className="w-full bg-[#F3B2B3] py-2 text-sm font-semibold text-[#D22519] hover:brightness-95"
                            style={{ fontFamily: "'Karla', sans-serif" }}
                            onClick={retornar}
                        >
                            Não
                        </button>


                        <button
                            className="flex w-full items-center justify-center bg-[#C5D7CA] py-2 text-sm font-semibold text-[#D22519] hover:brightness-95"
                            style={{ fontFamily: "'Karla', sans-serif" }}
                            onClick={deletarProduto}
                        >
                            {isLoading ? (
                                <ClipLoader color="#D22519" size={20} />
                            ) : (
                                "Sim"
                            )}
                        </button>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default DeletarProduto;