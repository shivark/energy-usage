const repository = require('./../repository/index');

module.exports = async ctx => ctx.body = await repository.get();