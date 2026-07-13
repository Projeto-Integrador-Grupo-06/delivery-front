import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="w-full bg-[#D22519] flex justify-between items-center px-10 py-4">
      
      <Link to="/" className="text-[#F0E7D6] text-2xl tracking-widest uppercase"
        style={{ fontFamily: 'Julius Sans One, serif' }}>
        RangoBox
      </Link>

      <div className="flex gap-8 items-center">
        <Link
          to="/produtos"
          className="text-[#F0E7D6] text-sm tracking-widest uppercase hover:text-white transition-colors"
          style={{ fontFamily: 'Karla, sans-serif' }}>
          Produtos
        </Link>
        <Link
          to="/categorias"
          className="text-[#F0E7D6] text-sm tracking-widest uppercase hover:text-white transition-colors"
          style={{ fontFamily: 'Karla, sans-serif' }}>
          Categorias
        </Link>
        <Link
          to="/categorias/cadastrar"
          className="text-[#F0E7D6] text-sm tracking-widest uppercase hover:text-white transition-colors"
          style={{ fontFamily: 'Karla, sans-serif' }}>
          Cadastrar Categoria
        </Link>
      </div>

    </nav>
  )
}

export default Navbar
