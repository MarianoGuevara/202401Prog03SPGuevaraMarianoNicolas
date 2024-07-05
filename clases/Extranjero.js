import { Persona }  from "./Persona.js";

class Extranjero extends Persona
{
    paisOrigen;

    constructor(nombre,apellido,fechaNacimiento,paisOrigen,id)
    {
        super(nombre,apellido,fechaNacimiento,id);
        this.paisOrigen = paisOrigen;
    }

    toString(){return JSON.stringify(this);}
    toJson(){return JSON.parse(this);}
}
export { Extranjero };