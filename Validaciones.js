class Validaciones
{
    static VerificarIdUnico(id, array, errorMsg)
    {
        if (Validaciones.IdUnico(id, array)) return id;
        else throw new Error(errorMsg);
    }

    static IdUnico(id, array)
    {
        let retorno = true;
        for(let i=0; i<array.length; i++)
        {
            if (array[i] == id) 
            {
                retorno = false;
                break;
            }
        }
        return retorno;
    }

    static ArrayStringToValidDate(array, maxYear, maxMonth, maxDay, errorMsg)
    {
        for (let i=0; i<array.length; i++)
        {
            if (isNaN(array[i]) || array[i] < 1) throw new Error(errorMsg);
        }
        let boolYear = array[0] < maxYear;
        let boolMonth = array[1] < maxMonth;
        let boolDay = array[2] < maxDay;
        let fechaValida = array[0] + array[1] + array[2]; // juego con que se puede comparar str con int y concatenar str  por eso no parseo nunca hasta el retorno...

        if (boolYear && boolMonth && boolDay) return parseInt(fechaValida);
        else throw new Error(errorMsg);  
    }

    static StringToDateArray(str)
    {
        str = str.toString();
        let year = "";
        let month = "";
        let day = "";
        for (let i=0; i<str.length; i++)
        {
            if (year.length != 4) year += str[i];
            else if (month.length != 2) month += str[i];
            else if (day.length != 2) day += str[i];
            else break;
        }
        let array = [year, month, day];
        return array;
    }

    static ValidarString(valor, minimo, msjError) 
    {
        if (this.VerificarNulo(valor, msjError) || !isNaN(valor) || valor.length < minimo) throw new Error(msjError);
        else return valor;
    }

    static ValidateNum(num, minimo=0, maximo=100, errorMsg)
    {
        if (!isNaN(num))
        {
            if (minimo!=null && maximo!=null)
            {
                if (parseInt(num) > minimo && parseInt(num) < maximo) return parseInt(num);
                else {throw new Error(errorMsg);}
            }
            else return parseInt(num);
        
        }
        else {throw new Error(errorMsg);}
    }
    static ValidateNumFloat(num, minimo=0, maximo=100, errorMsg)
    {
        if (!isNaN(num))
        {
            if (minimo!=null && maximo!=null)
            {
                if (parseFloat(num) > minimo && parseFloat(num) < maximo) return parseFloat(num);
                else {throw new Error(errorMsg);}
            }
            else return parseFloat(num);
        
        }
        else {throw new Error(errorMsg);}
    }

    static VerificarNulo(valor, errorMsg)
    {
        if (valor != null && valor != "") return valor;
        else throw new Error(errorMsg);
    }

    static VerificarStrVacio(valor, errorMsg)
    {
        if (valor != "") return valor;
        else throw new Error(errorMsg);
    }

    static VerificarNumMayorInt(num, minimo, errorMsg)
    {
        if (!isNaN(num))
            {
                if (num == "") throw new Error(errorMsg);
                else if (parseInt(num) > minimo)
                {
                    return parseInt(num);
                }
                else return parseInt(num);
            
            }
            else {throw new Error(errorMsg);}
    }
    static VerificarNumMayorFloat(num, minimo, errorMsg)
    {
        if (!isNaN(num))
            {
                if (num == "") throw new Error(errorMsg);
                else if (parseFloat(num) > minimo)
                {
                    return parseFloat(num);
                }
                else return parseFloat(num);
            
            }
            else {throw new Error(errorMsg);}
    }

    // ValidarId(valor, msjError)
    // {
    //     if (isNaN(valor) || !this.VerificarIdUnico(Persona.#listaId, valor)) throw new Error(msjError);
    //     else return parseInt(valor);
    // }

    // VerificarIdUnico(array, id)
    // {
    //     let retorno = true;
    //     let nuevoArray = array.map(function(element){return element == id;})
    //     for(let i=0; i<array.length; i++)
    //     {
    //         if (nuevoArray[i] == true) 
    //         {
    //             retorno = false;
    //             break;
    //         }
    //     }
    //     return retorno;
    // }

    // SetearIdUnico(maximo, array)
    // {
    //     let numId = Math.round(Math.random() * maximo)
    //     let unico = this.VerificarIdUnico(array, numId)
    //     if (!unico) return this.SetearIdUnico(maximo+=10, array);
    //     else return numId;
    // }


    // StringToDateArray(str)
    // {
    //     str = str.toString();
    //     let year = "";
    //     let month = "";
    //     let day = "";
    //     for (let i=0; i<str.length; i++)
    //     {
    //         if (year.length != 4) year += str[i];
    //         else if (month.length != 2) month += str[i];
    //         else if (day.length != 2) day += str[i];
    //         else break;
    //     }
    //     let array = [year, month, day];
    //     return array;
    // }
}

export { Validaciones }