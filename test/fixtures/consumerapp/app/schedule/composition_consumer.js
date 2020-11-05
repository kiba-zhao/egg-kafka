/**
 * @fileOverview composition消费者计划任务
 * @name composition_consumer.js
 * @author kiba.x.zhao <xiafeng@aegleanalytica.io>
 * @license MIT
 */
'use strict';

const Subscription = require('egg').Subscription;

class CompositionConsumer extends Subscription {

  static get schedule() {
    return { disable: true };
  }

  async subscribe(data) {
    console.log('in task', data);
  }

}

module.exports = CompositionConsumer;
