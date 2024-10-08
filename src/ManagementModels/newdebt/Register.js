const mongoose = require('mongoose');
const { Schema } = mongoose;

const RegisterDebtSchema = new mongoose.Schema({
  
    namedebtor:{ 
        type : Schema.Types.String,
        required : true 
    },  
    CIdebtor:{
         type: Schema.Types.Number,
         required: true
    },                  
    description:{
        type : Schema.Types.String,
        require : true
    },               
    status:{ 
    type: Schema.Types.String, 
    enum: ['draft', 'verified', 'regularized', 'archived'], 
    default: 'draft'
   
  },   
  // manejo del esquema debts 
  debts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Debts'  
}],
  // Manejo de estado del registro                                                       
  createdBy:{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
    
    }, // Referencia al usuario que lo creó
    
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },  // Último usuario que lo actualizó
},
{ timestamps: true });  // Habilita createdAt y updatedAt automáticamente

const Register = mongoose.model('Register', RegisterDebtSchema);
module.exports = Register;
