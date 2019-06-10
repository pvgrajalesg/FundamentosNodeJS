const fs = require('fs');
let listaCursos = [];
let listaEstudiantes = [];
let listaEstudiantesxCurso = [];

const crear = (curso) =>{
    const rutaCursos = 'src/listadoCursos.json';
    listaCursos = listar(rutaCursos);
    let cur = {
        id: curso.id,
        nombre: curso.nombreCurso,
        modalidad: curso.modalidad,
        valor: curso.valor,
        descripcion: curso.descripcion,
        intensidad: curso.intensidad,
        estado: 'disponible'
    }

    let repetido = listaCursos.find(c => c.id == curso.id);
    if(!repetido){
        listaCursos.push(cur);
        guardar(listaCursos, rutaCursos);
        return 'Curso creado correctamente';
    }else{

        return 'Ya existe otro curso con el mismo id';
    }
}

const inscribirEstudiante = (datosEstudiantexcurso) =>{
    const rutaEstudiantes = 'src/listadoEstudiantes.json';
    const rutaEstudiantesxCurso = 'src/listadoEstudiantesxCurso.json';
    listaEstudiantes = listar(rutaEstudiantes);
    let est = {
        documento: datosEstudiantexcurso.documento,
        nombre: datosEstudiantexcurso.nombre,
        correo: datosEstudiantexcurso.correo,
        telefono: datosEstudiantexcurso.telefono
    }

    repetido = listaEstudiantes.find(id => id.documento == datosEstudiantexcurso.documento);;
    if(!repetido){
        listaEstudiantes.push(est);
        guardar(listaEstudiantes, rutaEstudiantes);
    }

    listaEstudiantesxCurso = listar(rutaEstudiantesxCurso);
    let estxcur = {
        documento: datosEstudiantexcurso.documento,
        nombre: datosEstudiantexcurso.nombre,
        correo: datosEstudiantexcurso.correo,
        telefono: datosEstudiantexcurso.telefono,
        cursoInscrito : datosEstudiantexcurso.cursos
    }

    repetido = listaEstudiantesxCurso.find(nomCurso => nomCurso.cursoInscrito == datosEstudiantexcurso.cursos);
    if(!repetido){
        listaEstudiantesxCurso.push(estxcur);
        guardar(listaEstudiantesxCurso, rutaEstudiantesxCurso);
        return 'Estudiante inscrito correctamente';
    }else{
        return 'El estudiantes ya se encuentra inscrito en este curso';
    }    

}


const listar = (ruta) =>{
    try{
        return JSON.parse(fs.readFileSync(ruta));
    }catch(error){
        return [];
    }
}

const guardar = (lista, ruta) => {
    let datos = JSON.stringify(lista);
    fs.writeFile(ruta, datos, 
        (err) => { 
            if (err) throw (err);
            console.log('Archivo creado exitosamente');
        })
}

const mostrar = () =>{
    listar();
    listaCursos.forEach(cur => {
        console.log(cur.id);
        console.log(cur.nombre);
        console.log(cur.modalidad);
        console.log(cur.valor);
        console.log(cur.descripcion);
        console.log(cur.intensidad);
        console.log(cur.estado + '\n');
    });
}

const buscarEst = (nom) =>{
    listar();
    let estudiante = listaEstudiantes.find(buscar => buscar.nombre == nom);
    return estudiante;
}

const mostrarEst = (nom) =>{
    let estudiante = buscarEst(nom);
    if(!estudiante){
        console.log('El estudiante no existe');
    }else{
        console.log(estudiante.nombre);
        console.log('Notas:');
        console.log(' Matematicas ' + estudiante.matematicas);
        console.log(' Ingles ' + estudiante.ingles);
        console.log(' Programacion ' + estudiante.programacion);
    }
}

const buscarProm = (estudiante) => {
    return (estudiante.matematicas + estudiante.ingles + estudiante.programacion)/3;
}

const promedioEst = (nom) =>{
    let estudiante = buscarEst(nom);
    if(!estudiante){
        console.log('El estudiante no existe');
    }else{
        let promedio = buscarProm(estudiante);
        console.log('El promedio de ' + estudiante.nombre + ' es: ' + promedio);
    }
}

const promedioMayorTres = () => {
    listar();
    let promedioMayor = listaEstudiantes.filter(est => buscarProm(est) >= 3);
    console.log('Los estudiantes que tienen un promedio mayor a 3 son:');
    promedioMayor.forEach(nom => console.log(nom.nombre));
}

const actualizar = (nom, asignatura, calificacion) => {
    let estudiante = buscarEst(nom);
    if(!estudiante){
        console.log('El estudiante no existe');
    }else{
        if(!estudiante[asignatura]){
            console.log('Esa asignatura no existe');
        }else{
            estudiante[asignatura] = calificacion;
            guardar();
        }
    }
}

const eliminar = (nom) => {
    listar();
    let estudiantes = listaEstudiantes.filter(est => est.nombre != nom);

    if(estudiantes.length == listaEstudiantes.length){
        console.log('No se elimino ningún estudiante');
    }else{
        listaEstudiantes=estudiantes;
        console.log('Estudiante eliminado correctamente');
        guardar();
    }
}

module.exports = {
    crear,
    inscribirEstudiante,
    mostrar,
    mostrarEst,
    promedioEst,
    promedioMayorTres,
    actualizar,
    eliminar
}