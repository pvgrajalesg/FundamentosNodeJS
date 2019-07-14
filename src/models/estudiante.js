const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    documento:{
        type:Number,
        required:true
    },
    nombre:{
        required:true,
        type: String
    },
    correo:{
        required:true,
        type:String
    },
    telefono:{
        type:Number,
        required:true
    },
    usuario:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        default: 'Aspirante'
    }
}

)

estudianteSchema.plugin(uniqueValidator);

estudianteSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Ingrese un documento diferente, este documento ya ha sido ingresado por otro usuario'));
    } else {
      next(error);
    }
  });

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante