const m = require('moment');
const diffInDays = require('./diff-in-days');

module.exports = t => diffInDays(m.utc(m(t)).endOf('month'), m(t));