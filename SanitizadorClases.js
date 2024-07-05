import {Ciudadano} from "./clases/Ciudadano.js"; 
import {Extranjero} from "./clases/Extranjero.js"; 

class SanitizadorClases
{
    static FromObjectToClass(obj)
    {
        let retorno;
        if (obj["dni"] == undefined)
        {
            retorno = new Extranjero(obj["nombre"], obj["apellido"],
            obj["fechaNacimiento"], obj["paisOrigen"], obj["id"],
            )
        }
        else
        {
            retorno = new Ciudadano(obj["nombre"], obj["apellido"],
            obj["fechaNacimiento"], obj["dni"], obj["id"],
            )
        }
        return retorno;
    }

    static FromObjectArrayToClassArray(arrayObject)
    {
        try
        {
            let arrayFinal = [];
            for (let i=0; i<arrayObject.length; i++)
            {
                let objeto = SanitizadorClases.FromObjectToClass(arrayObject[i]);
                arrayFinal.push(objeto);
            }
            return arrayFinal;
        }
        catch (e) {throw e;}
    }
    

    static EncontrarIndice(arrayObject, id)
    {
        try
        {
            let retorno = -1;

            for (let i=0; i<arrayObject.length; i++)
            {
                if (arrayObject[i].id == id) retorno = i;
            }
            return retorno;
        }
        catch (e) {throw e;}
    }

    static ArrayValuesDeObjeto(objeto)
    {
        let lista = [objeto["id"], objeto["nombre"], objeto["apellido"], objeto["fechaNacimiento"]];

        if (objeto["dni"] != undefined)
        {
            lista.push(objeto["dni"]);
            lista.push("N/A");
        }
        else
        {
            lista.push("N/A");
            lista.push(objeto["paisOrigen"]);
        }
        return lista;
    }

    static ListaClasesTr(arrayObjetosFinal)
    {
        let clasesTr = [];
        for (let i=0; i<arrayObjetosFinal.length; i++)
        {
            clasesTr.push(SanitizadorClases.StringSegunDosObjetos(arrayObjetosFinal[i], "ciudadano", "extranjero", Ciudadano, Extranjero));
        }
        return clasesTr;
    }

    static StringSegunDosObjetos(objeto, valor1, valor2, clase1, clase2)
    {
        let strRetorno = "";
        if (objeto instanceof clase1) strRetorno = valor1;
        else if (objeto instanceof clase2) strRetorno = valor2;
        return strRetorno;
    }
}

export {SanitizadorClases}