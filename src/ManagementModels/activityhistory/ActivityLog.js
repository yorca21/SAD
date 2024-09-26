// registro de actividades 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivityLogSchema = new mongoose.Schema({
  
// Tipo de acción realizada
  action:{ 
    type:Schema.Types.String, 
    enum: ['created', 'edited', 'verified', 'regularized', 'archived'], 
    required: true 
  },   
  // detalle del registro afectado                                                      
  record:{ 
    type: Schema.Types.ObjectId, 
    ref: 'Register', 
    required: true 
  },
  // Usuario que realizó la acción
  nameuser:{ 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
}, 
// marcas de tiempo  
timestamp: 
  { 
    type: Date, 
    default: Date.now 
},         
  details: { 
    type: Schema.Types.String 
} // Detalles adicionales sobre la acción
});
 const Activity= mongoose.model('ActivityLog', ActivityLogSchema);

module.exports = Activity;