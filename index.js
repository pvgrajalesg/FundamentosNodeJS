const {argv, calcularPromedio} = require('./datos');
const express = require('express')
const app = express()

if(argv._[0]=='promedio'){
    texto = 'el promedio de ' + argv.n + ' es: ' + calcularPromedio;
}else{
    texto = 'promedio no calculado';
}

app.get('/', function (req, res) {
    res.send(texto);
  })
   
app.listen(3000);

//Promedio calculado y almacenado en un archivo

/*
const {estudiante, promedio} = require ('./datos');
let fs = require('fs');
console.log(estudiante);
console.log(promedio(estudiante.nota.matematicas, estudiante.nota.Ingles, estudiante.nota.Programacion));

let {nombre, edad: anos, nota:{matematicas, Ingles, Programacion}} = estudiante;

console.log('El promedio del estudiante es ' + promedio(matematicas, Ingles, Programacion));
console.log('La edad de estudiante es: ' + anos);

let crearArchivo = (estudiante) => {
    texto ='El nombre del estudiante es: ' + nombre +'\n'+
        'ha obtenido un promedio de: ' + promedio(matematicas, Ingles, Programacion);
    fs.writeFile('promedio.txt', texto, (err) =>{
        if(err) throw (err);
        console.log('Se ha creado el archivo');
    });
}

crearArchivo();
*/