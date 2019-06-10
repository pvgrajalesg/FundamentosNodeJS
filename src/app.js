const express = require('express')
const app = express()
const path = require('path');
const hbs = require('hbs');
require('./helpers');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const dirNode_modules = path.join(__dirname , '../node_modules')
const directorioPublico = path.join(__dirname, '../public');
const directorioPartials = path.join(__dirname, '../templates/partials');
const directorioViews = path.join(__dirname, '../templates/views');

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
app.use(express.static(directorioPublico));

hbs.registerPartials(directorioPartials);

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'hbs');
app.set('views', directorioViews);

app.get('/', (req, res) => {
  res.render('index', {
    estudiante : 'Paola'
  });
});

app.post('/calculos', (req, res) => {
  res.render('calculos', {
    estudiante : req.body.nombre,
    nota1: parseInt(req.body.nota1),
    nota2: parseInt(req.body.nota2),
    nota3: parseInt(req.body.nota3)
  });
});

app.get('/crearCurso', (req, res) => {
  res.render('crearCurso', {
  });
});

app.post('/mensajeCurso', (req, res) => {
  res.render('mensajeCurso', {
    datosCurso : req.body
  });
});

app.get('/verCursos', (req, res) => {
  res.render('verCursos', {
  });
});

app.get('/inscribir', (req, res) => {
  res.render('inscribir', {
  });
});

app.post('/mensajeInscritos', (req, res) => {
  res.render('mensajeInscritos', {
    datosEstudiante : req.body,
    datosCurso : req.body.cursos
  });
});

app.get('/verInscritos', (req, res) => {
  res.render('verInscritos', {
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    estudiante: 'error'
  });
});
   
app.listen(port, () => {
  console.log('Escuchando en el puerto' + port);
})