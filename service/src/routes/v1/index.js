const KoaRouter = require('koa-router');
const meterReadingController = require('./../../meter-readings/controller/');
const usageReportController = require('./../../usage-report/controller/');

const router = new KoaRouter();

router
  .get('/', (ctx, next) => (ctx.redirect('/docs'), next()))
  .get('/meter-readings', async (ctx, next) => (await meterReadingController.get(ctx), next()))
  .post('/meter-readings', async (ctx, next) => (await meterReadingController.post(ctx), next()))
  .get('/usage-report', async (ctx, next) => (await usageReportController.get(ctx), next()));

module.exports = router;