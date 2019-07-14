const hbs = require('hbs');
const fs = require('fs');
const funciones = require('./funciones');

hbs.registerHelper('inscribirEstudiante', (datosEstudiante) => {
    return funciones.inscribirEstudiante(datosEstudiante);
});

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerHelper('mostrarCursos1', (listado) => {

    let texto = "<table class='table'> \
                    <thead class='thead-dark'> \
                        <tr> \
                            <th>Id</th> \
                            <th>Nombre del curso</th> \
                            <th>Modalidad</th> \
                            <th>Valor</th> \
                            <th>Descripción</th> \
                            <th>Intensidad Horaria</th> \
                            <th>Estado</th> \
                        </tr> \
                    </thead> \
                    <tbody>";
    listado.forEach(curso => {
        texto = texto +
            '<tr>' +
            '<td>' + curso.id + '</td>' +
            '<td>' + curso.nombre + '</td>' +
            '<td>' + curso.modalidad + '</td>' +
            '<td>' + curso.valor + '</td>' +
            '<td>' + curso.descripcion + '</td>' +
            '<td>' + curso.intensidad + '</td>' +
            '<td>' + curso.estado + '</td>' +
            '</tr>';
    })

    texto = texto + '</tbody></table>';
    return texto;
});

hbs.registerHelper('mostrarCursos2', (listado) => {
    let texto = "<div class='accordion' id='accordionExample'>";
    i = 1;
    listado.forEach(curso => {
        if (curso.estado == 'Disponible') {
            texto = texto +
                `<div class="card">
          <div class="card-header" id="heading${i}">
            <h2 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
              ${curso.id}: ${curso.nombre}
              </button>
            </h2>
          </div>
          <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
            <div class="card-body">
              Descripción: ${curso.descripcion} <br>
              Modalidad: ${curso.modalidad} <br>
              Valor: ${curso.valor} <br>
              Intensidad: ${curso.intensidad} <br>
            </div>
          </div>
        </div>`
            i = i + 1;
        }
    })

    texto = texto + '</div>';
    return texto;
});

hbs.registerHelper('mostrarInscritos', (listadoCurso, listadoEstudiante, listadoEstudiantesCursos) => {
    let texto = "<div class='accordion' id='accordionExample'>";
    i = 1;
    listadoCurso.forEach(curso => {
        texto = texto +
            `<div class="card">
          <div class="card-header" id="heading${i}">
            <h2 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                ${curso.nombre}
              </button>
            </h2>
          </div>
          <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
            <div class="card-body">
        
                        <table class='table'>
                            <thead class='thead-dark'>
                            <tr>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                                <th>Eliminar</th>
                            </tr>
                            </thead>
                            <tbody>`;
        listadoEstudiantesCursos.forEach(cursoEstudiante => {
            if (cursoEstudiante.id == curso.id) {
                listadoEstudiante.forEach(estudiante => {
                    if (estudiante.documento == cursoEstudiante.documento) {
                        texto = texto +
                            '<tr>' +
                            '<td>' + estudiante.documento + '</td>' +
                            '<td>' + estudiante.nombre + '</td>' +
                            '<td>' + estudiante.correo + '</td>' +
                            '<td>' + estudiante.telefono + '</td>' +
                            '<td>' +
                            '<form action="/delete" method="post">'+
                            `<input id="nombre" type="hidden" name="nombreCurso" value=${estudiante.documento} >` +
                            '<button type="submit" class="btn btn-danger">Eliminar</button>'+
                            '</form> </td>'+
                        '</tr>';
                    }
                })
            }
        })

        texto = texto + `</tbody>

                        </table>
        </div>
          </div>
        </div>`
        i = i + 1;
    });

    texto = texto + '</div>';
    return texto;


});


const listar = (ruta) => {
    try {
        return JSON.parse(fs.readFileSync(ruta));
    } catch (error) {
        return [];
    }
}

hbs.registerHelper('cargarCursos', (listado) => {

    let cursosDisponibles = '<option selected> - </option>'
    listado.forEach(curso => {
        if (curso.estado == 'Disponible') {
            cursosDisponibles = cursosDisponibles +
                `<option value=${curso.id}>` + curso.nombre + '</option>';
        }
    });

    return cursosDisponibles;
});