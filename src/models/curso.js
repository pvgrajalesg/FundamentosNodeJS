const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const cursoSchema = new Schema({

    id:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    modalidad:{
        type:String
    },
    valor:{
        type:Number,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    intensidad:{
        type:Number
    },
    estado:{
        type: String,
        default: 'Disponible'
    }
})

cursoSchema.plugin(uniqueValidator);

cursoSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Dos cursos no pueden tener el mismo id'));
    } else {
      next(error);
    }
  });

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso