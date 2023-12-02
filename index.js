const { registrar, leer, existeCitaPorNombre, validarRegistro } = require('./operaciones');

const [operacion, ...args] = process.argv.slice(2);

if (operacion === 'registrar') {
    const [nombre, edad, tipo, color, enfermedad] = args;
    if (validarRegistro(nombre, edad, tipo, color, enfermedad)) {
        registrar(nombre, edad, tipo, color, enfermedad);
    } else {
        console.log('Datos de la cita no válidos. Por favor, proporcione todos los detalles requeridos.');
    }
} else if (operacion === 'leer') {
    leer();
} else if (operacion === 'leer1') {
    const [nombre] = args;
    if (nombre) {
        const resultado = existeCitaPorNombre(nombre);
        console.log(resultado.mensaje);
    } else {
        console.log('Por favor, proporcione un nombre para buscar citas.');
    }
} else {
    console.log('Comando no reconocido');
}

