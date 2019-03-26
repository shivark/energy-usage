const moment = require('moment');

module.exports = date => moment(date).subtract(1, 'months').format('YYYY-MM');