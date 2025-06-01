const Counter = require('../models/Counter')

const getNextOrderNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { id: 'order' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
};

module.exports = getNextOrderNumber ;