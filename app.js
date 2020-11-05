/**
 * @fileOverview 应用worker入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const kafka = require('./lib/kafka');

module.exports = app => {

  const config = app.config.kafka;
  if (config.consumerGroup) {
    app.messenger.on(config.event, onMessage.bind(this, app, config.topics));
  }

  kafka(app);
};

function onMessage(app, topics, data) {

  const rules = topics[data.topic];
  if (!rules || rules.length <= 0)
    return;
  for (let rule of rules) {
    app.runSchedule(rule, data);
  }
}

