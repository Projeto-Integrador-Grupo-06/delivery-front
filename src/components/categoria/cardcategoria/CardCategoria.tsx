import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {

  console.log("CATEGORIA RECEBIDA NO CARD:", categoria);

  return (
    <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow">

      <div className="bg-[#D22519] px-4 py-3">
        <h2
          className="text-left text-lg uppercase text-[#FDFDF5]"
          style={{ fontFamily: "'Julius Sans One', sans-serif" }}
        >
          Categoria
        </h2>
      </div>


      <div className="flex items-center justify-between bg-[#9DBDB8] px-4 py-4">

        <p
          className="text-base font-semibold text-[#D22519]"
          style={{ fontFamily: "'Julius Sans One', sans-serif" }}
        >
          {categoria.tipo}
        </p>

      </div>


      <div className="flex">

        <Link
          to={`/categorias/editar/${categoria.id}`}
          className="flex w-full items-center justify-center bg-[#C5D7CA] py-2 text-sm font-semibold text-[#D22519] transition hover:brightness-95"
          style={{ fontFamily: "'Karla', sans-serif" }}
        >
          Editar
        </Link>


        <Link
          to={`/categorias/deletar/${categoria.id}`}
          className="flex w-full items-center justify-center bg-[#F3B2B3] py-2 text-sm font-semibold text-[#D22519] transition hover:brightness-95"
          style={{ fontFamily: "'Karla', sans-serif" }}
        >
          Excluir
        </Link>

      </div>

    </div>
  );
}

export default CardCategoria;