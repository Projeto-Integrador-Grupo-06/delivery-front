import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar } from "../../../service/Service";
import type Produto from "../../../models/Produto";

function EditarProduto() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

    const [produto, setProduto] = useState<Produto>({
      nome: "",
      valor: 0,
      marca: "",
      validade: "",
    });
  

  useEffect(() => {
    if (id !== undefined) {
      buscar(`/produtos/${id}`, setProduto, {});
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  }

  async function editarProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await atualizar(`/produtos/${id}`, produto, setProduto, {});

      alert("Produto atualizado com sucesso!");

      navigate("/produtos");
    } catch (error) {
      alert("Erro ao atualizar produto!");
    }
  }
  return (
    <div>
      <h1 className="text-4xl text-[#D22519] text-center p-6 m-6 font-bold font-['Julius_Sans_One']">
        Editar Produto
      </h1>

      <form action="" onSubmit={editarProduto}>
        <div className="flex flex-col justify-center items-center content-center">
          <div className="sm:col-span-4">
            <label className="block text-sm/6 font-medium text-[#D22519] pl-9 p-1.5 font-['Karla'] ">
              Título Produto
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 ">
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="Descreva seu Produto:"
                   value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="block min-w-0  py-1.5 pr-3 pl-1 text-base text-[#D22519] placeholder:text-[#D22519] border-2 border-[#D22519] rounded-[10px] focus:outline-none sm:text-sm/6 w-[1201.33px] h-[71.71px] font-['Karla']"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm/6 font-medium text-[#D22519] pl-9 p-1.5 font-['Karla']">
              Valor do Produto
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 ">
                <input
                  id="valor"
                  type="text"
                  name="valor"
                  placeholder="Informe o Valor do Produto em R$:"
                   value={produto.valor}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="block min-w-0  py-1.5 pr-3 pl-1 text-base text-[#D22519] placeholder:text-[#D22519] border-2 border-[#D22519] rounded-[10px] focus:outline-none sm:text-sm/6 w-[1201.33px] h-[71.71px] font-['Karla']"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm/6 font-medium text-[#D22519] pl-9 p-1.5 font-['Karla']">
              Marca do Produto
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 ">
                <input
                  id="marca"
                  type="text"
                  name="marca"
                  placeholder="Informe a Marca do Produto:"
                   value={produto.marca}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="block min-w-0  py-1.5 pr-3 pl-1 text-base text-[#D22519] placeholder:text-[#D22519] border-2 border-[#D22519] rounded-[10px] focus:outline-none sm:text-sm/6 w-[1201.33px] h-[71.71px] font-['Karla']"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-sm/6 font-medium text-[#D22519] pl-9 p-1.5 font-['Karla']">
              Validade do Produto
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 ">
                <input
                  id="validade"
                  type="text"
                  name="validade"
                  placeholder="Informe a Validade do Produto: dd/mm/aaaa"
                   value={produto.validade}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  className="block min-w-0  py-1.5 pr-3 pl-1 text-base text-[#D22519] placeholder:text-[#D22519] border-2 border-[#D22519] rounded-[10px] focus:outline-none sm:text-sm/6 w-[1201.33px] h-[71.71px] font-['Karla']"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#9DBDB8] w-[321.75px] h-[61.93px] text-[#D22519] rounded-4xl text-bold m-5 shadow cursor-pointer  font-bold font-['Julius_Sans_One']"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarProduto;
