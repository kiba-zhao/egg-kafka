/**
 * @fileOverview 消息类型
 * @name consumer.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';
const kafka = require('kafka-node');
const { ConsumerGroup } = kafka;

const EGG_READY = "egg-ready";
// const EGG_PIDS = "egg-pids";
const KAFKA_MESSAGE = "message";

class Consumer {

  constructor(messanger, config) {
    this.messanger = messanger;
    this.opts = Object.assign({}, config.opts);
    this.topics = config.topics;
    this.event = config.event;
    // this.pids = [];
    this.init();
  }

  init() {
    // this.messanger.on(EGG_PIDS, this.onPidsChanged.bind(this));
    this.messanger.on(EGG_READY, this.onEggReady.bind(this));
  }

  onPidsChanged(pids) {
    this.pids = pids;
  }

  onEggReady() {
    if (this.consumerGroup)
      return;
    this.consumerGroup = new ConsumerGroup(this.opts, this.topics);
    this.consumerGroup.on(KAFKA_MESSAGE, this.onMessage.bind(this));

  }

  onMessage(message) {

    if (this.opts.autoCommit === false)
      this.commit();
    this.messanger.sendRandom(this.event, message);

  }
}

module.exports = Consumer;

