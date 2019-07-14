const express = require('express')
const app = express()
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcrypt');

require('./../helpers');
const Estudiante = require('./../models/estudiante');
const Curso = require('./../models/curso');
const CursoxEstudiante = require('./../models/cursoxestudiante');

const directorioPartials = path.join(__dirname, '../../templates/partials');
const directorioViews = path.join(__dirname, '../../templates/views');

hbs.registerPartials(directorioPartials);

app.set('view engine', 'hbs');
app.set('views', directorioViews);

app.get('/', (req, res) => {
  if(req.session.usuario){
      res.render('ingresar', {
          mensaje: 'Bienvenido: ' + req.session.nombre,
    });
  }

  let estudiante = new Estudiante({
    documento: 11111,
    tipo: 'Coordinador',
    nombre: 'Camila',
    correo: 'camila@yahoo.com',
    usuario: 'camila',
    password: bcrypt.hashSync('12345', 10),
    telefono: 5436756
  });

  estudiante.save((err, result1)=>{
    if(err){
      return console.log(err);
    }
  });
    res.render('index', {
      
    });
  });

  app.post('/forRegistrarse', (req, res) => {
    res.render('formRegistro', {
      
    });
  });

  app.post('/registro', (req, res) => {
    let estudiante = new Estudiante({
      documento: req.body.documento,
      nombre: req.body.nombre,
      correo: req.body.correo,
      usuario: req.body.usuario,
      password: bcrypt.hashSync(req.body.password, 10),
      telefono: req.body.telefono
    });

    estudiante.save((err, result1)=>{
      if(err){
        res.render('mensajeInscritos', {
          mostrar:'El estudiante no pudo ser registrado'
        });
      }
      res.render('mensajeInscritos', {
        mostrar: "El estudiante fue registrado satisfactoriamente"
      });
    }); 
  });
  
  app.get('/crearCurso', (req, res) => {
    res.render('crearCurso', {
    });
  });
  
  app.post('/mensajeCurso', (req, res) => {
    let curso = new Curso({
      id:req.body.id,
      nombre:req.body.nombreCurso,
      modalidad:req.body.modalidad,
      valor:req.body.valor,
      descripcion:req.body.descripcion,
      intensidad:req.body.intensidad
    })

    curso.save((err, result) =>{
      if(err){
        res.render('mensajeCurso', {
          mostrar: 'El curso no pudo ser creado'
        });
      }
      res.render('mensajeCurso', {
        mostrar: 'El curso fue creado satisfactoriamente'
      });
    });
  });
  
  app.get('/verCursos', (req, res) => {
    Curso.find({}).exec((err, result) =>{
      if(err){
        return console.log(err);
      }
      res.render('verCursos', {
        listado: result
      });
    })
  });
  
  app.get('/inscribir', (req, res) => {
    Curso.find({}).exec((err, result) =>{
      if(err){
        return console.log(err);
      }
      console.log(result);
      res.render('inscribir', {
        listado: result
      });
    })
  });
  
  app.post('/mensajeInscritos', (req, res) => {

    let cursoxestudiante = new CursoxEstudiante({
      documento: req.body.documento,
      id: req.body.cursos
    })

    Estudiante.find({documento: req.body.documento}).exec((err, result1)=>{
      if(err){
        res.render('mensajeInscritos', {
          mostrar:'Estudiante no encontrado'
        });
      }else{
        cursoxestudiante.save((err, result2)=>{
          if(err){
            res.render('mensajeInscritos', {
              mostrar:'Curso no encontrado'
            });
          }
          res.render('mensajeInscritos', {
            mostrar: 'Estudiante inscrito satisfactoriamente'
          });
        });
      }
    });    
  });

  app.post('/delete', (req, res) =>{
    Estudiante.deleteOne({documento: req.body.nombreCurso}, (err, result) =>{
      if(err){
        res.render('mensajeInscritos', {
          mostrar:'El estudiante no pudo ser eliminado'
        });
      }
      res.render('mensajeInscritos', {
        mostrar: "El estudiante fue eliminado satisfactoriamente"
      });
    })
  })

  app.post('/actualizarCurso', (req, res) =>{
    Curso.findOneAndUpdate({id: req.body.cursos}, {estado: 'Cerrado'}, {new: true}, (err, result) =>{
      if(err){
        return console.log(err);
      }
      console.log('Curso actualizado satisfactoriamente');
      res.redirect('/verCursos');
    })
  })

  app.post('/ingresar', (req, res) =>{
    
    Estudiante.findOne({usuario: req.body.usuario}, (err, result) =>{
      if(err){
        return console.log(err);
      }
      if(!result){
        return res.render('ingresar', {
          mensaje: 'Usuario o contraseña incorrecta'
        })
      }

      if(!bcrypt.compareSync(req.body.password, result.password)){
        return res.render('ingresar', {
          mensaje: 'Usuario o contraseña incorrecta'
        })
      }
      
      req.session.usuario = result._id;
      req.session.nombre = result.nombre;
      req.session.tipo = result.tipo;

      res.render('ingresar', {
        mensaje: 'Bienvenido: ' + req.session.nombre,
        session: true,
        nombre: req.session.nombre,
        tipo: req.session.tipo
      });
    })
  })
  
  app.get('/verInscritos', (req, res, next) => {
    CursoxEstudiante.find({}).exec((err1, result) =>{
      if(err1){
        return console.log(err1);
      }
      Curso.find({}).exec((err2, resultCurso) =>{
        if(err2){
          return console.log(err2);
        }
      Estudiante.find({}).exec((err4, resultEstudiante)=>{
        if(err4){
          return console.log(err4);
        }

        res.render('verInscritos', {
          listadoCurso:resultCurso,
          listadoEstudiante: resultEstudiante,
          listadoEStudiantesCursos: result
        });

      });
      });
    });
  });

  app.get('/salir', (req, res) =>{
    req.session.destroy((error)=>{
      if(error) 
        return console.log(error)
    })

    res.redirect('/')
  })
  
  app.get('*', (req, res) => {
    res.render('error', {
      estudiante: 'error'
    });
  });

  module.exports = app;