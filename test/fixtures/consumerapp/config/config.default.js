/**
 * @fileOverview kafkaƒ¨»œ≈‰÷√
 * @name config.default.js
 * @author kiba.x.zhao <xiafeng@aegleanalytica.io>
 * @license MIT
 */
'use strict';

module.exports = app => {

  const exports = {};

  exports.kafka = {
    event: 'kafka_message',
    topics: { composition: ['composition_consumer'] },
    consumerGroup: {
      groupId: app.name,
      sessionTimeout: 15000,
      protocol: ['roundrobin'],
      encoding: 'utf8',
      fromOffset: 'latest',
      outOfRangeOffset: 'earliest'
    },
    client: {
      kafkaHost: 'localhost:9092'
    }
  };

  return exports;

};
