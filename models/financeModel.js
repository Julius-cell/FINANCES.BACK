const { Schema, model } = require('mongoose');

const financeSchema = new Schema({
  incomes: {},
  expenses: {},
  creationDate: Date,
  modificationDate: Date,
});

financeSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
})

const Finance = model('Finance', financeSchema);

module.exports = Finance;