/**
 * @fileOverview agent workerÈë¿Ú
 * @name agent.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const kafka = require('./lib/kafka');

module.exports = agent => {

  const config = agent.config.kafka;
  if (!config.consumerGroup)
    return;
  kafka(agent, true);
};


