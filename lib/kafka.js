/**
 * @fileOverview 
 * @name kafka.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const Consumer = require('./consumer');
const Producer = require('./producer');

module.exports = (app, isAgent) => {
  app.addSingleton('kafka', isAgent ? buildByAgent : buildByApp);
};

function buildByApp(clientConfig, app) {
  const config = app.config.kafka;
  const opts = { client: clientConfig, producer: config.producer, app };

  const client = new Producer(opts);
  app.beforeClose(() => {
    client.destroy();
  });
  return client;
}

function buildByAgent(clientConfig, app) {
  const config = app.config.kafka;
  const opts = {
    opts: Object.assign({}, clientConfig, config.consumerGroup),
    topics: Object.keys(config.topics),
    event: config.event
  };

  return new Consumer(app.messenger, opts);
}



