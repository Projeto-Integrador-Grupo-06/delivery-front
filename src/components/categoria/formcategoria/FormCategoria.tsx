import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [categoria, setCategoria] = useState<Categoria>({
    tipo: "",
    descricao: "",
    categoriaVegano: false,
    categoriaOrganico: false,
  });

  // Busca os dados da categoria quando é edição
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/categorias/${id}`, categoria, setCategoria);
        ToastAlerta("Categoria atualizada com sucesso!", "sucesso");
      } else {
        await cadastrar(`/categorias`, categoria, setCategoria);
        ToastAlerta("Categoria cadastrada com sucesso!", "sucesso");
      }

      navigate("/categorias"); // ajusta pra rota real da sua listagem
    } catch (error) {
      ToastAlerta("Erro ao salvar a categoria", "erro");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-[#F0E7D6]">
      <div className="p-10 w-full max-w-xl">

        <h1 className="text-3xl text-center font-titulo text-[#D22519] mb-8">
          {id ? "Editar Categoria" : "Cadastrar Categoria"}
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          <div>
            <label className="font-texto block mb-2 text-gray-700 font-medium">
              Tipo da categoria
            </label>

            <input
              type="text"
              name="tipo"
              value={categoria.tipo}
              onChange={(e) =>
                setCategoria({ ...categoria, tipo: e.target.value })
              }
              placeholder="Digite o tipo da categoria"
              className="font-texto placeholder:text-[#D22519] w-full border-2 border-[#D22519] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#D22519]"
            />
          </div>

          <div>
            <label className="font-texto block mb-2 text-gray-700 font-medium">
              Descrição
            </label>

            <textarea
              rows={4}
              name="descricao"
              value={categoria.descricao}
              onChange={(e) =>
                setCategoria({ ...categoria, descricao: e.target.value })
              }
              placeholder="Descreva a categoria"
              className="font-texto placeholder:text-[#D22519] w-full border-2 border-[#D22519] rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#D22519]"
            />
          </div>

          <div className="flex gap-8">

            <label className="font-texto flex items-center gap-2">
              <input
                type="checkbox"
                name="categoriaVegano"
                checked={categoria.categoriaVegano}
                onChange={(e) =>
                  setCategoria({ ...categoria, categoriaVegano: e.target.checked })
                }
              />
              Categoria Vegana
            </label>

            <label className="font-texto flex items-center gap-2">
              <input
                type="checkbox"
                name="categoriaOrganico"
                checked={categoria.categoriaOrganico}
                onChange={(e) =>
                  setCategoria({ ...categoria, categoriaOrganico: e.target.checked })
                }
              />
              Categoria Orgânica
            </label>

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="font-texto bg-[#9DBDB8] hover:text-[#D22519] text-white font-semibold py-3 rounded-lg transition flex justify-center items-center disabled:opacity-70"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              id ? "Atualizar" : "Cadastrar"
            )}
          </button>
          {id && (
            <Link
              to={`/categorias/deletar/${id}`}
              className="font-texto text-center text-[#D22519] underline"
            >
              Deletar esta categoria
            </Link>
          )}

        </form>

      </div>
    </div>
  );
}

export default FormCategoria;