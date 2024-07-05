import {Utilidades} from "./Utilidades.js";
import {SanitizadorClases} from "./SanitizadorClases.js";
import {LlamarFormABM} from "./index.js";
class Tabla
{
    constructor(etiquetaPadre, arrayFilas, arrayEncabezado, arrayClasesEncabezado, arrayClasesFilas, accion="alta", eventoTd=false, funcion=null)
    {
        this.accion = accion;
        this.eventoTd = eventoTd;
        this.funcion = funcion;

        this.arrayFilas = arrayFilas; // debe ser un array de objetos [{}, {}, {}]...
        this.arrayEncabezado = arrayEncabezado; // un array []
        this.CrearTabla(etiquetaPadre, arrayClasesEncabezado, arrayClasesFilas);
    }

    CrearTabla(etiquetaPadreDeTabla, arrayClasesEncabezado, arrayClasesFilas)
    {
        let table = Utilidades.CrearElementoHtml("table", "tablaDatos", "", false);

        let arrayColumnasClaseTd = arrayClasesEncabezado.map(function(element){return element + " encabezadoTd";})

        let encabezado = this.CrearFilaTabla("encabezado", this.arrayEncabezado, arrayColumnasClaseTd);
        table.appendChild(encabezado);

        this.DibujarFilasTabla(arrayClasesFilas, arrayClasesEncabezado, table, true);
        etiquetaPadreDeTabla.appendChild(table);
    }

    CrearFilaTabla(claseTr, listaValores, arrayClasesTd=null)
    {
        let tr = Utilidades.CrearElementoHtml("tr", claseTr, "", false);

        for (let i=0; i<listaValores.length; i++)
        {
            let casillaTd = Utilidades.CrearElementoHtml("td", "tdTabla " + arrayClasesTd[i], listaValores[i]);

            if (claseTr != "encabezado" && this.eventoTd != false && (i==listaValores.length-2 || i==listaValores.length-1 )) 
            {
                if (i==listaValores.length-2) 
                {
                    casillaTd.addEventListener("click", function() {
                        LlamarFormABM(tr, "modificar");
                    });
                }
                else if (i==listaValores.length-1)
                {
                    casillaTd.addEventListener("click", function() {
                        LlamarFormABM(tr, "eliminar");
                    });
                }
                
                // casillaTd.addEventListener("click", funcion);
            }

            tr.appendChild(casillaTd);
        }
        return tr;
    }

    DibujarFilasTabla(clasesFilas, arrayColumnas, tablaObjeto, editarEliminar=false)
    {
        for (let i=0; i<this.arrayFilas.length; i++)
        {
            let listaValoresActual = SanitizadorClases.ArrayValuesDeObjeto(this.arrayFilas[i]);

            if (editarEliminar != false)
            {
                listaValoresActual[listaValoresActual.length] = "modificar"; // agrega nuevo indice
                listaValoresActual[listaValoresActual.length] = "eliminar";
            }

            let fila;
            if (clasesFilas == null) fila = this.CrearFilaTabla("", listaValoresActual, arrayColumnas);
            else fila = this.CrearFilaTabla(clasesFilas[i], listaValoresActual, arrayColumnas);

            tablaObjeto.appendChild(fila);

            // fila.addEventListener("dblclick",function(){EditarABM(fila);})
        }

        // ExtraerObjetoID("contenedorTabla").appendChild(tablaObjeto);
    }
}
export { Tabla };