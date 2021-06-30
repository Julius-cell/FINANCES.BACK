const { Schema, model } = require('mongoose');

const financeSchema = new Schema({
  incomes: [],
  expenses: [],
  creationDate: Date,
  modificationDate: Date,
});

const Finance = model('Finance', financeSchema);

module.exports = Finance;