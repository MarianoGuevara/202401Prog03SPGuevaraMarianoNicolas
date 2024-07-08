import {Utilidades} from "./Utilidades.js";
import {Validaciones} from "./Validaciones.js";
import {FormularioSpinner} from "./FormularioSpinner.js";
import {arrayFinal, ActualizarTabla} from "./index.js";
import {SanitizadorClases} from "./SanitizadorClases.js";

class FormularioABM
{

                            //los 4 array deben ser iguales en lenght. Como listas paralelas
    constructor(etiquetaPadre, arrayClasesDiv, arrayLabelsClases, arrayLabelsTextos, arrayInputClases, accion="alta", objEdit=null, select=false, idSelect=null, opc1=null,opc2=null,opc3=null,opc4=null, hayFuncionCambio=false, funcion=null)
    {
        this.accion = accion;
        this.objEdit = objEdit;

        let titulo = Utilidades.CrearElementoHtml("h2", "titulo", "Formulario ABM", true);
        let subTitulo =Utilidades.CrearElementoHtml("h4", "subTitulo", "Alta", true);

        etiquetaPadre.appendChild(titulo);
        etiquetaPadre.appendChild(subTitulo);

        for (let i=0; i<arrayClasesDiv.length; i++)
        {
            let divActual = this.AgregarDivLabelInput(arrayClasesDiv[i], arrayLabelsClases[i],
                                                    arrayLabelsTextos[i], arrayInputClases[i])
            etiquetaPadre.appendChild(divActual);
        }

        if (select != false)
        {
            let select = null;
            if (hayFuncionCambio) select = this.AgregarSelect(idSelect, opc1, opc2, opc3, opc4, true, funcion);
            else select = this.AgregarSelect(idSelect, opc1, opc2, opc3, opc4);
            
            etiquetaPadre.appendChild(select);
        }

        let botonAceptar = Utilidades.CrearElementoHtml("button", "btnAceptar", "Aceptar", true);
        let botonCancelar = Utilidades.CrearElementoHtml("button", "btnCancelar", "Cancelar", true);

        etiquetaPadre.appendChild(botonAceptar);
        etiquetaPadre.appendChild(botonCancelar);

        this.HabilitarInputs();

        Utilidades.ExtraerListaClase("txt_id")[0].readOnly = true;

        if (this.accion == "alta")
        {
            botonAceptar.addEventListener("click", this.btnAceptarAlta.bind(this));

            subTitulo.textContent = "Alta";
            Utilidades.ExtraerListaClase("selectTipo")[0].value = "ciudadano";

            Utilidades.ExtraerListaClase("txt_id")[0].value = "";
            Utilidades.ExtraerListaClase("txt_apellido")[0].value = "";
            Utilidades.ExtraerListaClase("txt_nombre")[0].value = "";
            Utilidades.ExtraerListaClase("txt_fechaNacimiento")[0].value = "";
            Utilidades.ExtraerListaClase("txt_atr1")[0].value = "";

            Utilidades.ExtraerListaClase("lbl_atr1")[0].textContent = "dni";
        }
        else if (this.accion == "modificar")
        {
            botonAceptar.addEventListener("click", this.btnAceptarModificar.bind(this));

            subTitulo.textContent = "Modificar";
            this.DeshabilitarCiertosInputs(true, true, false, false, false, false, false);

            this.SetearValoresObjeto();
            this.id = Utilidades.ExtraerListaClase("txt_id")[0].value;
        }
        else
        {
            botonAceptar.addEventListener("click", this.btnAceptarEliminar.bind(this));

            subTitulo.textContent = "Eliminar";
            this.DeshabilitarCiertosInputs(true, true, true, true, true, true, true);

            this.SetearValoresObjeto();
            this.id = Utilidades.ExtraerListaClase("txt_id")[0].value;
        }
        botonCancelar.addEventListener("click", this.btnCancelar.bind(this));
    }

    SetearValoresObjeto()
    {
        let listaTd = this.objEdit.querySelectorAll("td");
            
        Utilidades.ExtraerListaClase("txt_id")[0].value = listaTd[0].textContent;
        Utilidades.ExtraerListaClase("txt_nombre")[0].value = listaTd[1].textContent;
        Utilidades.ExtraerListaClase("txt_apellido")[0].value = listaTd[2].textContent;
        Utilidades.ExtraerListaClase("txt_fechaNacimiento")[0].value = listaTd[3].textContent;

        console.log(listaTd[4]);
        if (listaTd[4].textContent != "N/A")
        {
            Utilidades.ExtraerListaClase("selectTipo")[0].value = "ciudadano";
            Utilidades.ExtraerListaClase("txt_atr1")[0].value = listaTd[4].textContent;
            Utilidades.ExtraerListaClase("lbl_atr1")[0].textContent = "dni";
        }
        else
        {
            Utilidades.ExtraerListaClase("selectTipo")[0].value = "extranjero";
            Utilidades.ExtraerListaClase("txt_atr1")[0].value = listaTd[5].textContent;
            Utilidades.ExtraerListaClase("lbl_atr1")[0].textContent = "paisOrigen";
        }
        this.id = Utilidades.ExtraerListaClase("txt_id")[0].value;
    }

    DeshabilitarCiertosInputs(select,id,nombre,apellido,fechaNacimiento,atr1)
    {
        if (select==true)Utilidades.ExtraerListaClase("selectTipo")[0].disabled = true;
        if (id==true)Utilidades.ExtraerListaClase("txt_id")[0].disabled = true;
        if (nombre==true)Utilidades.ExtraerListaClase("txt_nombre")[0].disabled = true;
        if (apellido==true)Utilidades.ExtraerListaClase("txt_apellido")[0].disabled = true;
        if (fechaNacimiento==true)Utilidades.ExtraerListaClase("txt_fechaNacimiento")[0].disabled = true;
        if (atr1==true)Utilidades.ExtraerListaClase("txt_atr1")[0].disabled = true;
    }

    HabilitarInputs()
    {
        Utilidades.ExtraerListaClase("selectTipo")[0].disabled = false;
        Utilidades.ExtraerListaClase("txt_id")[0].disabled = false;
        Utilidades.ExtraerListaClase("txt_nombre")[0].disabled = false;
        Utilidades.ExtraerListaClase("txt_apellido")[0].disabled = false;
        Utilidades.ExtraerListaClase("txt_fechaNacimiento")[0].disabled = false;
        Utilidades.ExtraerListaClase("txt_atr1")[0].disabled = false;
    }

    AgregarDivLabelInput(claseDiv, claseLabel, txtLabel, claseInput)
    {
        let div = Utilidades.CrearElementoHtml("div", claseDiv, null, false);
        div.appendChild(Utilidades.CrearElementoHtml("label", claseLabel, txtLabel, true));
        div.appendChild(Utilidades.CrearElementoHtml("input", claseInput, null, false));
        return div;
    }

    AgregarSelect(idSelect, opc1=null,opc2=null,opc3=null,opc4=null, hayEvento=false, funcion=null)
    {
        let select = Utilidades.CrearElementoHtml('select', "selectTipo", null, false);
        select.id = idSelect;
        
        if (opc1!=null)
        {
            let option1 = document.createElement('option');
            option1.value = opc1;
            option1.text = opc1;
            select.appendChild(option1);
        }
        if (opc2!=null)
        {
            let option1 = document.createElement('option');
            option1.value = opc2;
            option1.text = opc2;
            select.appendChild(option1);
        }
        if (opc3!=null)
        {
            let option1 = document.createElement('option');
            option1.value = opc3;
            option1.text = opc3;
            select.appendChild(option1);
        }
        if (opc4!=null)
        {
            let option1 = document.createElement('option');
            option1.value = opc4;
            option1.text = opc4;
            select.appendChild(option1);
        }

        if (hayEvento != false)
        {
            select.addEventListener('change', funcion);
        }

        return select;
    }

    btnCancelar()
    {
        Utilidades.ExtraerObjetoID("formulario-lista").style.display = "";
        let children = Utilidades.ExtraerObjetoID("formulario-abm").children;
        while (children.length > 0) {
            Utilidades.ExtraerObjetoID("formulario-abm").removeChild(children[0]);
        }
        Utilidades.ExtraerObjetoID("formulario-abm").style.display = "none";
    }

    SetearEntidad()
    {
        let nombre = Utilidades.ExtraerListaClase("txt_nombre")[0].value;
        let apellido = Utilidades.ExtraerListaClase("txt_apellido")[0].value;
        let fechaNacimiento = Utilidades.ExtraerListaClase("txt_fechaNacimiento")[0].value;
        let atr1 = Utilidades.ExtraerListaClase("txt_atr1")[0].value;

        try
        {
            Validaciones.VerificarNulo(nombre, "Nombre invalido");
            Validaciones.VerificarNulo(apellido, "Apellido invalido");
            fechaNacimiento = Validaciones.ArrayStringToValidDate(Validaciones.StringToDateArray(fechaNacimiento),
            2025, 13, 32, "Fecha inválida");

            let pp = {
                nombre: nombre, 
                apellido: apellido, 
                fechaNacimiento: fechaNacimiento
            };

            if (Utilidades.ExtraerListaClase("selectTipo")[0].value == "ciudadano") 
            {
                Validaciones.VerificarNumMayorInt(atr1, 0, "Dni no valido");
                pp.dni = atr1;
            }
            else
            {
                Validaciones.VerificarNulo(atr1, "Apellido invalido");
                pp.paisOrigen = atr1;
            }
            console.log(pp);
            return pp;
        }
        catch (e) {throw e;}
    }

    async btnAceptarAlta()
    {
        try
        {
            let entidad = this.SetearEntidad();

            new FormularioSpinner(Utilidades.ExtraerObjetoID("body"));

            const response = await fetch("https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero", {
                method: 'POST',
                mode: 'cors', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(entidad)
            })
            if (response.ok) // Esto es q el server da 200. Si no, va al else. Peero no esq rompe. Solo no es 200
            {
                let data = await response.json();
                entidad.id = data.id;

                let idArray = arrayFinal.map(function(e){return e.id;})
                Validaciones.VerificarIdUnico(data.id, idArray, "Id no único");

                let obj = SanitizadorClases.FromObjectToClass(entidad);
                arrayFinal.push(obj);
                ActualizarTabla();
            }
            else alert("Hubo un error con la petición a la api");
        }
        catch (e) {alert(e.message)}
        finally
        {
            this.btnCancelar();
            Utilidades.ExtraerObjetoID("body").removeChild(Utilidades.ExtraerListaClase("spinner")[0]);
        }
    }

    btnAceptarModificar()
    {
        try
        {
            let entidad = this.SetearEntidad();
            entidad.id = Utilidades.ExtraerListaClase("txt_id")[0].value;

            new FormularioSpinner(Utilidades.ExtraerObjetoID("body"));

            const response = fetch("https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero", {
                method: 'PUT', 
                mode: 'cors', 
                headers: {
                'Content-Type': 'application/json'},
                body: JSON.stringify(entidad)
            })
            .then(response=>{ // 1ro
                console.log(response);
                if (!response.ok) {
                    throw new Error(`Error en la solicitud`);
                }
                return response;
            }) // 2do
            .then(response=>{
                let indice = SanitizadorClases.EncontrarIndice(arrayFinal, entidad.id);
                let obj = SanitizadorClases.FromObjectToClass(entidad);

                arrayFinal[indice] = obj;
                ActualizarTabla(arrayFinal);

                return response;
            }) // 3ro; error.
            .catch(error=>{
                return alert(error.message);
            })
            .finally(() => {
                this.btnCancelar();
                Utilidades.ExtraerObjetoID("body").removeChild(Utilidades.ExtraerListaClase("spinner")[0]);
            });
            // sigue inmediatamente
        }
        catch (e) {alert(e.message)}
    }

    async btnAceptarEliminar()
    {
        try
        {
            let entidad = this.SetearEntidad();
            entidad.id = Utilidades.ExtraerListaClase("txt_id")[0].value;

            let id = {id : entidad.id};

            new FormularioSpinner(Utilidades.ExtraerObjetoID("body"));

            const response = await fetch("https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero", {
                method: 'DELETE',
                mode: 'cors', 
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            })

            if (response.ok)
            {
                let index = SanitizadorClases.EncontrarIndice(arrayFinal, entidad.id);
                arrayFinal.splice(index, 1)
                ActualizarTabla(arrayFinal);
            }
            else alert("Hubo un error con la petición a la api");
        }
        catch (e) {alert(e.message)}
        finally
        {
            this.btnCancelar();
            Utilidades.ExtraerObjetoID("body").removeChild(Utilidades.ExtraerListaClase("spinner")[0]);
        }
    }
}   

export {FormularioABM}