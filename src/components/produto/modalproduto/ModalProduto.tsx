import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css'
import FormProduto from "../formproduto/FormProduto";

function ModalProduto() {
    return (
        <>
            <Popup
                trigger={<button className="bg-[#d22519] text-[#f0e7d6] rounded-3xl px-4 py-2 hover:bg-transparent hover:border-solid hover:border-[#d22519] hover:border-2 hover:text-[#d22519] cursor-pointer"> Adicionar Produto

                </button>}
                modal contentStyle={{
                    width: "auto",
                    height: "600px",
                    borderRadius: "1rem",
                    padding: "2rem",
                    overflowY: "auto"
                }}>

                <FormProduto />
            </Popup>

        </>
    )
}

export default ModalProduto