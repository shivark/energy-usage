const monthEndUsage = require('./month-end-usage');
const lastMonth = require('./last-month');

module.exports = readings => readings.reduce((p, c, i) => (!i ? p : (p[i - 1] = {
  month: lastMonth(c.reading_date),
  usage: monthEndUsage({ r1: readings[i - 1], r2: c }),
}, p)), []);