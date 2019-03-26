const usagesByMonth = require('../usage-by-month');
const meterReadingRepository = require('./../../meter-readings/repository');

const get = async ctx => ctx.body = usagesByMonth(await meterReadingRepository.get());

module.exports = get;