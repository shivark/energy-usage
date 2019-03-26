require('dotenv').config();
const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const database = require('./database');
const indexRouter = require('./routes/v1/index');
const docs = require('./documentation');

const PORT = process.env.PORT || 3000;

function createServer() {
  const server = new Koa();
  server.use(indexRouter.allowedMethods());
  server.use(json());
  server.use(bodyParser());
  server.use(indexRouter.routes());
  server.use(docs());
  return server;
}

module.exports = createServer;

if (!module.parent) {
  database.init(database.connection);
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}