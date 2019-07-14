const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const cursoxestudianteSchema = new Schema({
    documento:{
        type:Number,
        required:true
    },
    id:{
        type:String,
        required:true
    },

})

cursoxestudianteSchema.plugin(uniqueValidator);

cursoxestudianteSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('Un estudiante no se puede inscribir dos veces en el mismo curso'));
    } else {
      next(error);
    }
  });

const CursoxEstudiante = mongoose.model('CursoxEstudiante', cursoxestudianteSchema);

module.exports = CursoxEstudiante
