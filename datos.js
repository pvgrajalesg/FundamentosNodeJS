const opciones = {
    nombre: {
        default: 'Juan',
        alias: 'n'
    },
    matematicas: {
        default: 0,
        alias: 'm'
    },
    ingles: {
        default: 0,
        alias: 'i'
    },
    programacion: {
        demand: true,
        alias: 'p'
    },
}

const argv = require('yargs')
    .command('promedio', 'Calcular Promedio', opciones)
    .argv;

let calcularPromedio = (argv.m+argv.i+argv.p)/3;

module.exports = {
    argv,
    calcularPromedio
};

//Promedio calculado y almacenado en un archivo
/*let estudiante = {
    nombre:'Juan',
    edad: 25,
    nota:{
        matematicas: 3,
        Ingles: 4,
        Programacion: 5
    }
};

let promedio = (nota_uno, nota_dos, nota_tres) => (nota_uno + nota_dos + nota_tres) / 3;

module.exports = {
    estudiante,
    promedio
};*/