const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
require('./config/config')

const dirNode_modules = path.join(__dirname , '../node_modules')
const directorioPublico = path.join(__dirname, '../public');

app.use(express.static(directorioPublico));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) =>{
  if(req.session.usuario){
    res.locals.session = true
    res.locals.nombre = req.session.nombre
    res.locals.tipo = req.session.tipo
  }

  next()
})

app.use(bodyParser.urlencoded({extended: false}))

//Routers
app.use(require('./routers/index'));

mongoose.connect(process.env.URLDB, {useNewUrlParser: true}, (err, result) =>{
  if(err){
    return console.log(err);
  }

  console.log('conectado');
}
);
   
app.listen(process.env.PORT, () => {
  console.log('Escuchando en el puerto ' + process.env.PORT);
})