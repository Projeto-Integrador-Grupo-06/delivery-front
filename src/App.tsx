import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import ListarCategorias from "./pages/categoria/ListarCategoria"
import FormCategoria from "./components/categoria/formcategoria/FormCategoria"
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria"
import ListarProdutos from "./pages/produto/ListarProdutos"
import FormProduto from "./components/produto/formproduto/FormProduto"
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto"
import EditarProduto from "./components/produto/editarProduto/EditarProduto"



function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh] bg-[#F0E7D6]">
        <Routes>
          <Route path="/" element={<Home />} />

       
          <Route path="/categorias" element={<ListarCategorias />} />
          <Route path="/categorias/cadastrar" element={<FormCategoria />} />
          <Route path="/categorias/editar/:id" element={<FormCategoria />} />
          <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />

         
          <Route path="/produtos" element={<ListarProdutos />} />
          <Route path="/produtos/cadastrar" element={<FormProduto/>} />
          <Route path="/produtos/editar/:id" element={<EditarProduto/>} />
          <Route path="/produtos/deletar/:id" element={<DeletarProduto />} />

        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
