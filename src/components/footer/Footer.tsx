function Footer() {
  return (
    <footer className="w-full bg-[#D22519] flex flex-col items-center py-8 gap-2">
      
      <h2 className="text-[#F0E7D6] text-2xl tracking-widest uppercase"
        style={{ fontFamily: 'Julius Sans One, serif' }}>
        RangoBox
      </h2>

      <p className="text-[#F0E7D6] text-sm text-center max-w-lg"
        style={{ fontFamily: 'Karla, sans-serif' }}>
        Sistema desenvolvido para facilitar o gerenciamento de categorias e a organização dos produtos de delivery.
      </p>

      <p className="text-[#F0E7D6] text-sm"
        style={{ fontFamily: 'Karla, sans-serif' }}>
        © 2026 RangoBox. Todos os direitos reservados.
      </p>

    </footer>
  )
}

export default Footer
