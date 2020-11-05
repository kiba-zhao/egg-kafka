/**
 * @fileOverview kafka接入文件
 * @name producer.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const { HighLevelProducer, KafkaClient } = require('kafka-node');
const { promisify } = require('util');

class Producer {

  constructor(config) {
    this.app = config.app;
    this.clientOpts = config.client;
    this.producerOpts = config.producer;
    this.init();
  }

  init() {
    this.client = new KafkaClient(this.clientOpts);
    this.producer = new HighLevelProducer(this.client, this.producerOpts);
    this.producer.on('error', this.onError.bind(this));
    this._send = promisify(this.producer.send.bind(this.producer));
    this._close = promisify(this.producer.close.bind(this.producer));
  }

  onError(...args) {
    this.app.logger.error(...args);
  }
  async waitForReady() {
    const ready = await isReady(this.producer);
    if (!ready)
      throw new Error('kafka not ready');
  }

  async send(...args) {
    await this.waitForReady();
    return await this._send(...args);
  }

  async destroy() {
    await this._close();
  }
}

function isReady(producer) {
  return producer.ready ? Promise.resolve(true) : new Promise((resolve) => {
    producer.once('ready', () => resolve(true));
  });
}

module.exports = Producer;
