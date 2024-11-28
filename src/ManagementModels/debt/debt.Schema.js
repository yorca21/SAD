const mongoose = require('mongoose');
const { Schema } = mongoose;

const DebtSchema = new mongoose.Schema({
  amount: {
    type: Schema.Types.Number,
   
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  recordDate: {
    type: Date,
    required: true,
  },
  debtor: {
    type: Schema.Types.ObjectId,
    ref: 'Register',
    required: true,
  },
  isVisible: { 
    type: Schema.Types.Boolean, 
    default: true 
  },
}, { timestamps: true });

const Debt = mongoose.model('Debt', DebtSchema);
module.exports = Debt
