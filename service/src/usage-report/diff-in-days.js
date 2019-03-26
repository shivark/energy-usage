const m = require('moment');

module.exports = (t1, t2) => m(t1).diff(m(t2), 'days');