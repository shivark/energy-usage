const diffInDays = require('./diff-in-days');
const daysToMonthEnd = require('./days-to-month-end');

module.exports = ({
  r1: { cumulative: c1, reading_date: t1 },
  r2: { cumulative: c2, reading_date: t2 },
}) => c1 + (((c2 - c1) / diffInDays(t2, t1)) * daysToMonthEnd(t1));