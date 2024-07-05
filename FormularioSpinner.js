import { Utilidades } from "./Utilidades.js"

class FormularioSpinner
{
    constructor(etiquetaPadre)
    {
        etiquetaPadre
        let div = Utilidades.CrearElementoHtml("div", "spinner", "", false);
        let div2 = Utilidades.CrearElementoHtml("div", "spinnerGirar", "", false);
        div.appendChild(div2);
        etiquetaPadre.appendChild(div);
    }
}
export {FormularioSpinner}