import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { buscar } from "../../service/Service";
import CardCategoria from "../../components/categoria/cardcategoria/CardCategoria";
import type Categoria from "../../models/Categoria";

function ListaCategorias() {

    const [isLoading, setIsLoading] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        buscarCategorias();
    }, []);

    async function buscarCategorias() {
        try {
            setIsLoading(true);

            await buscar("/categorias", setCategorias);

        } catch (error) {
            console.log("Erro ao buscar categorias:", error);
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

                    {!isLoading && categorias.length === 0 && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma Categoria foi encontrada!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categorias.map((categoria) => (
                            <CardCategoria
                                key={categoria.id}
                                categoria={categoria}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ListaCategorias;
