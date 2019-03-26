const repository = require('../repository');

module.exports = async ctx => ctx.body = await repository.set(ctx.request.body);