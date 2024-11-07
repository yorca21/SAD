const mongoose = require('mongoose'); 
const { Schema } = mongoose;

const DebtorSchema = new mongoose.Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  ci: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  status: {
    type: Schema.Types.String,
    enum: ['pending', 'active', 'deregistered'],
    default: 'pending',
  },
  file: {
    type: Schema.Types.String,
  },
  debts: [{
    type: Schema.Types.ObjectId,
    ref: 'Debt',
  }],
}, { timestamps: true });
const Debtor = mongoose.model('Debtor', DebtorSchema);
module.exports = Debtor
