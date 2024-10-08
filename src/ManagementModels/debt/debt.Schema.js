const mongoose = require('mongoose');
const { Schema } = mongoose;

const DebtSchema = new Schema({
  
    date: { 
        type: Schema.Types.Date, 
        required: true 
    },  // Fecha del adeudo
    isPaid: { 
        type: Schema.Types.Boolean, 
        default: false 
    },  // Estado de la deuda, si está pagada o no
});
const Debts = mongoose.model('Debts', DebtSchema);
module.exports = Debts;