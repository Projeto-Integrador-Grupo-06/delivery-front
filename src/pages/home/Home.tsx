import ModalProduto from "../../components/produto/modalproduto/ModalProduto";
import ListarProdutos from "../produto/ListarProdutos";

function Home() {
  return (
    <>
      <div className="bg-[#f0e7d6] flex justify-center p-15">
        <div className="grid lg:grid-cols-6 w-screen place-items-center font-bold bg-[#9dbdb8] rounded-4xl p-0">
          <div className="flex flex-col gap-4 items-center justify-center py-4 col-span-4 ">
            <h2
              className="text-5xl font-bold text-[#d22519] "
              style={{ fontFamily: "'Julius Sans One', sans-serif" }}
            >
              Organize sua alimentação!
            </h2>
            <p
              className="text-xl text-center px-10 font-sans text-[#d22519]"
              style={{ fontFamily: "'Karla', sans-serif" }}
            >
              Gerencie categorias de produtos de forma simples, rápida e segura
              em uma plataforma intuitiva.
            </p>
            <div className=" flex justify-around gap-4">
              <ModalProduto />
            </div>
          </div>

          <div className=" flex justify-center col-span-2">
            <img
              src="https://i.imgur.com/GZKM5uo.png"
              alt="Imagem Home"
              className=" h-full m-0 rounded-r-3xl object-cover"
            />
          </div>
        </div>
      </div>
      <ListarProdutos />
    </>
  );
}

export default Home;
