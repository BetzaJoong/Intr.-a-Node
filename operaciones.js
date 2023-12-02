const fs = require('fs');

const citasPath = './citas.json';

function cargarCitas() {
    try {
        const citas = fs.readFileSync(citasPath, 'utf8');
        return JSON.parse(citas);
    } catch (error) {
        return [];
    }
}

function guardarCitas(citas) {
    fs.writeFileSync(citasPath, JSON.stringify(citas, null, 2), 'utf8'); // toma el objeto citas, lo convierte en una cadena JSON formateada con una sangría de 2 espacios 
}

function validarRegistro(nombre, edad, tipo, color, enfermedad) {
    return nombre && edad && tipo && color && enfermedad;
}

function registrar(nombre, edad, tipo, color, enfermedad) {
    const nuevaCita = { nombre, edad, tipo, color, enfermedad };
    const citas = cargarCitas();

    // Validar si la cita ya existe
    const citaExistente = citas.find(cita => {
        return (
            cita.nombre === nuevaCita.nombre &&
            cita.edad === nuevaCita.edad &&
            cita.tipo === nuevaCita.tipo &&
            cita.color === nuevaCita.color &&
            cita.enfermedad === nuevaCita.enfermedad
        );
    });

    if (citaExistente) {
        console.log('Ya existe una cita registrada para esta mascota.');
    } else {
        citas.push(nuevaCita);
        guardarCitas(citas);
        console.log('Cita registrada con éxito.');
    }
}

function leer() {
    const citas = cargarCitas();
    if (citas.length === 0) {
        console.log('No hay citas registradas.');
    } else {    //Se muestra una tabla
        console.log('Citas registradas:');
        console.table(citas);     
    }
}

function existeCitaPorNombre(nombre) {
    const citas = cargarCitas();
    
    if (!citas || !Array.isArray(citas)) {
        return { existe: false, mensaje: 'No hay citas registradas.' };
    }

    const citaEncontrada = citas.find(cita => cita && cita.nombre && cita.nombre.toLowerCase() === nombre.toLowerCase());

    if (citaEncontrada) {
        return { existe: true, mensaje: 'Ya tienes citas registradas.' };
    } else {
        return { existe: false, mensaje: 'No hay citas registradas para este nombre.' };
    }
}

module.exports = { registrar, leer, existeCitaPorNombre, validarRegistro };









