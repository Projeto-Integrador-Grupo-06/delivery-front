import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../../models/Produto";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [produto, setProduto] = useState<Produto>({
    nome: "",
    valor: 0,
    marca: "",
    validade: "",
    categoria: null,
  });

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error) {
      ToastAlerta("Erro ao carregar as categorias.", "success");
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  }

  function selecionarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const categoriaSelecionada = categorias.find(
      (categoria) => categoria.id == e.target.value
    );

    if (categoriaSelecionada) {
      setProduto({
        ...produto,
        categoria: categoriaSelecionada,
      });
    }
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar("/produtos", produto, setProduto);
        ToastAlerta("O Produto foi atualizado com sucesso!", "sucesso");
      } else {
        await cadastrar("/produtos", produto, setProduto);
        ToastAlerta("O Produto foi cadastrado com sucesso!", "sucesso");
      }

      retornar();
    } catch (error: any) {
      if (!error.toString().includes("401")) {
        ToastAlerta(
          id !== undefined
            ? "Erro ao atualizar o Produto."
            : "Erro ao cadastrar o Produto.",
          "erro"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  const inputClasses = `
    w-full
    h-[64px]
    px-6
    rounded-xl
    border-2
    border-[#D22519]
    text-lg
    text-[#D22519]
    placeholder:text-[#D22519]/60
    bg-white
    shadow-sm
    transition-all
    duration-200
    focus:outline-none
    focus:ring-4
    focus:ring-[#D22519]/20
    focus:border-[#D22519]
    font-['Karla']
  `;

  const labelClasses = `
    block
    text-xl
    text-[#D22519]
    font-bold
    font-['Karla']
    mb-3
  `;

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-[#FDFDF5]
        flex
        flex-col
        items-center
        py-12
        px-4
      "
    >
      <h1
        className="
          text-5xl
          text-[#D22519]
          text-center
          mb-10
          font-bold
          font-['Julius_Sans_One']
        "
      >
        {id === undefined ? "Cadastrar Produto" : "Atualizar Produto"}
      </h1>

      <form
        onSubmit={gerarNovoProduto}
        className="
          bg-white
          w-[95%]
          max-w-[1800px]
          rounded-3xl
          shadow-2xl
          px-10
          md:px-20
          py-12
        "
      >
        <div className="flex flex-col gap-8">

          {/* Nome */}
          <div>
            <label className={labelClasses}>Título Produto</label>
            <input
              id="nome"
              type="text"
              name="nome"
              placeholder="Descreva o Nome:"
              value={produto.nome}
              onChange={atualizarEstado}
              className={inputClasses}
            />
          </div>

          {/* Valor */}
          <div>
            <label className={labelClasses}>Valor do Produto</label>
            <input
              id="valor"
              type="number"
              name="valor"
              placeholder="Informe o valor do Produto em R$:"
              value={produto.valor}
              onChange={atualizarEstado}
              className={inputClasses}
            />
          </div>

          {/* Marca + Validade lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClasses}>Marca do Produto</label>
              <input
                id="marca"
                type="text"
                name="marca"
                placeholder="Informe a Marca do Produto:"
                value={produto.marca}
                onChange={atualizarEstado}
                className={inputClasses}
              />
            </div>

            <div>
              <label className={labelClasses}>Validade do Produto</label>
              <input
                id="validade"
                type="text"
                name="validade"
                placeholder="Informe a Validade: dd/mm/aaaa"
                value={produto.validade}
                onChange={atualizarEstado}
                className={inputClasses}
              />
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className={labelClasses}>Categoria</label>
            <select
              id="categoria"
              name="categoria"
              value={produto.categoria?.id ?? ""}
              onChange={selecionarCategoria}
              className={`${inputClasses} cursor-pointer hover:border-[#D22519]/80`}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="
              mt-6
              mx-auto
              bg-[#9DBDB8]
              hover:bg-[#839558]
              hover:scale-105
              transition-all
              duration-300
              w-[350px]
              h-[70px]
              text-[#D22519]
              rounded-full
              shadow-lg
              cursor-pointer
              font-bold
              text-xl
              font-['Julius_Sans_One']
              flex
              items-center
              justify-center
            "
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={30} />
            ) : id === undefined ? (
              "Cadastrar Produto"
            ) : (
              "Atualizar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProduto;