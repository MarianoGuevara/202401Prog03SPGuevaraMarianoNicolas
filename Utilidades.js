class Utilidades
{
    static ExtraerObjetoID(idString) { return document.getElementById(idString); }

    static ExtraerListaClase(classString) { return document.getElementsByClassName(classString); }
    
    static EliminarObjeto(objetoPadre, objetoHijo) 
    {
        let hijoEliminado = objetoHijo;
        objetoPadre.removeChild(objetoHijo);
        return hijoEliminado;
    }
    
    static CrearElementoHtml(tipoEtiqueta, nombreClase, valorTexto, conTexto=true)
    {
        let etiqueta = document.createElement(tipoEtiqueta); 
        etiqueta.setAttribute("class", nombreClase);
    
        if (conTexto)
        {
            let hijo = document.createTextNode(valorTexto);
            etiqueta.appendChild(hijo);
        }
    
        return etiqueta;
    }
}
export { Utilidades }

