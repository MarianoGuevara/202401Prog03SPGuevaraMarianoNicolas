class Persona
{
    id;
    nombre;
    apellido;
    fechaNacimiento;

    constructor(nombre,apellido,fechaNacimiento,id=null)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
    }
}
export { Persona };