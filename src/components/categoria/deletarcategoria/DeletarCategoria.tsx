import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../service/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams<{ id: string }>();


    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria);

        } catch (error) {
            ToastAlerta("Erro ao buscar a categoria.", "erro");
        }
    }


    useEffect(() => {
        if (id) {
            buscarPorId(id);
        }
    }, [id]);


    async function deletarCategoria() {

        setIsLoading(true);

        try {

            await deletar(`/categorias/${id}`);

            ToastAlerta("Categoria deletada com sucesso!", "sucesso");

            retornar();

        } catch (error) {

            ToastAlerta("Erro ao deletar a categoria.", "erro");

        }

        setIsLoading(false);
    }


    function retornar() {
        navigate("/categorias");
    }


    return (

        <main className="bg-[#F0E7D6] min-h-[80vh] flex items-center justify-center px-4">

            <div className="w-full max-w-sm">


                <h1
                    className="mb-4 text-center text-2xl uppercase text-[#D22519]"
                    style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                >
                    Deletar Categoria
                </h1>


                <p
                    className="mb-5 text-center text-sm font-semibold text-[#2D2D2D]"
                    style={{ fontFamily: "'Karla', sans-serif" }}
                >
                    Você tem certeza que deseja apagar esta categoria?
                </p>


                <div className="overflow-hidden rounded-2xl shadow-md">


                    <header
                        className="bg-[#D22519] px-4 py-3 text-left text-lg uppercase text-[#FDFDF5]"
                        style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                    >
                        Categoria
                    </header>


                    <div className="flex flex-col gap-2 bg-[#9DBDB8] px-4 py-4">


                        <p
                            className="text-base font-semibold text-[#D22519]"
                            style={{ fontFamily: "'Julius Sans One', sans-serif" }}
                        >
                            {categoria.tipo}
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
                            onClick={deletarCategoria}
                        >

                            {isLoading ? (
                                <ClipLoader
                                    color="#D22519"
                                    size={20}
                                />
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

export default DeletarCategoria;