import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../service/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarCategoria() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categoria, setCategoria] = useState<Categoria>({
    tipo: "",
    descricao: "",
    categoriaVegano: false,
    categoriaOrganico: false,
  });

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function buscarPorId(id: string) {
    try {
      setIsLoading(true);
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error) {
      ToastAlerta("Erro ao buscar a categoria", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletar() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`);
      ToastAlerta("Categoria deletada com sucesso!", "sucesso");
      navigate("/categorias");
    } catch (error) {
      ToastAlerta("Erro ao deletar a categoria", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#F0E7D6]">
      <div className="p-10 w-full max-w-xl">

        <h1 className="text-3xl text-center font-titulo text-[#D22519] mb-8">
          Deletar Categoria
        </h1>

        <p className="font-texto text-center text-gray-700 mb-6">
          Tem certeza que deseja excluir esta categoria?
        </p>

        <div className="flex flex-col gap-5">

          <div>
            <label className="font-texto block mb-2 text-gray-700 font-medium">
              Tipo da categoria
            </label>
            <input
              type="text"
              value={categoria.tipo}
              disabled
              className="font-texto w-full border-2 border-[#D22519] rounded-lg p-3 bg-gray-100 text-gray-600"
            />
          </div>

          <div>
            <label className="font-texto block mb-2 text-gray-700 font-medium">
              Descrição
            </label>
            <textarea
              rows={4}
              value={categoria.descricao}
              disabled
              className="font-texto w-full border-2 border-[#D22519] rounded-lg p-3 bg-gray-100 text-gray-600 resize-none"
            />
          </div>

          <div className="flex gap-8">
            <label className="font-texto flex items-center gap-2 text-gray-600">
              <input type="checkbox" checked={categoria.categoriaVegano} disabled />
              Categoria Vegana
            </label>

            <label className="font-texto flex items-center gap-2 text-gray-600">
              <input type="checkbox" checked={categoria.categoriaOrganico} disabled />
              Categoria Orgânica
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/categorias")}
              className="font-texto flex-1 border-2 border-[#D22519] text-[#D22519] font-semibold py-3 rounded-lg hover:bg-[#D22519] hover:text-white transition"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleDeletar}
              disabled={isLoading}
              className="font-texto flex-1 bg-[#D22519] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition flex justify-center items-center disabled:opacity-70"
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Sim, Deletar"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DeletarCategoria;