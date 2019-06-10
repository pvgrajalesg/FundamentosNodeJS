const hbs = require('hbs');
const fs = require('fs');
const funciones = require('./funciones');

let listaCursos = [];
let listaEstudiantesxCurso = [];
const rutaCursos = 'src/listadoCursos.json';
const rutaEstudiantesxCurso = 'src/listadoEstudiantesxCurso.json';

hbs.registerHelper('obtenerPromedio', (nota1, nota2, nota3) => {
    return (nota1+nota2+nota3)/3;
});

hbs.registerHelper('crearCurso', (datosCurso) => {
    return funciones.crear(datosCurso);
});

hbs.registerHelper('inscribirEstudiante', (datosEstudiante) =>{
    return funciones.inscribirEstudiante(datosEstudiante);
}

);

hbs.registerHelper('mostrarCursos', () => {
    listaCursos = listar(rutaCursos);

    let texto = "<table> \
                    <thead> \
                        <th>Id</th> \
                        <th>Nombre del curso</th> \
                        <th>Modalidad</th> \
                        <th>Valor</th> \
                        <th>Descripción</th> \
                        <th>Intensidad Horaria</th> \
                        <th>Estado</th> \
                    </thead> \
                    <tbody>";
    listaCursos.forEach(curso => {
        texto = texto + 
                '<tr>' +
                    '<td>'+ curso.id + '</td>' +
                    '<td>'+ curso.nombre + '</td>' +
                    '<td>'+ curso.modalidad + '</td>' +
                    '<td>'+ curso.valor + '</td>' +
                    '<td>'+ curso.descripcion + '</td>' +
                    '<td>'+ curso.intensidad+ '</td>' +
                    '<td>'+ curso.estado + '</td>' +
                '</tr>';
    })

    texto = texto + '</tbody></table>';
    return texto;
});

hbs.registerHelper('mostrarInscritos', () => {
    listaEstudiantesxCurso = listar(rutaEstudiantesxCurso);
    console.log(listaEstudiantesxCurso);
    let texto = "<table> \
                    <thead> \
                        <th>Id</th> \
                        <th>Nombre del curso</th> \
                        <th>Modalidad</th> \
                        <th>Valor</th> \
                        <th>Descripción</th> \
                        <th>Intensidad Horaria</th> \
                        <th>Estado</th> \
                    </thead> \
                    <tbody>";
        listaEstudiantesxCurso.forEach(curso => {
        texto = texto + 
                '<tr>' +
                    '<td>'+ curso.cursoInscrito + '</td>' +
                    '<td>'+ curso.documento + '</td>' +
                    '<td>'+ curso.nombre + '</td>' +
                    '<td>'+ curso.correo + '</td>' +
                    '<td>'+ curso.telefono + '</td>' +
                '</tr>';
    })

    texto = texto + '</tbody></table>';
    return texto;
});

const listar = (ruta) =>{
    try{
        return JSON.parse(fs.readFileSync(ruta));
    }catch(error){
        return [];
    }
}

hbs.registerHelper('cargarCursos', () =>{

    let cursosDisponibles = '<option selected> - </option>'
    listaCursos = listar(rutaCursos);
    console.log(listaCursos);
    listaCursos.forEach(curso => {
        if(curso.estado == 'disponible'){
            cursosDisponibles = cursosDisponibles + 
            '<option>' + curso.nombre + '</option>';
        }
    });

    return cursosDisponibles;
});