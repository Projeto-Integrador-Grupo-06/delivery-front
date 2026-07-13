import { useState } from "react";
import { useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

function FormCategoria() {
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({
    tipo: "",
    descricao: "",
    categoriaVegano: false,
    categoriaOrganico: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Categoria a ser cadastrada:", categoria);
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
            className="font-texto bg-[#9DBDB8] hover:text-[#D22519] text-white font-semibold py-3 rounded-lg transition"
          >
            {id ? "Atualizar" : "Cadastrar"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default FormCategoria;