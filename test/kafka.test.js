/**
 * @fileOverview kafka²å¼þ²âÊÔ
 * @name kafka.test.js
 * @author kiba.x.zhao <xiafeng@aegleanalytica.io>
 * @license MIT
 */
'use strict';
const { KafkaClient, HighLevelProducer } = require('kafka-node');
const mm = require('egg-mock');
process.env.SENDMESSAGE_ONE_PROCESS = true;

function sendMessage(opts, payloads, callback) {
  const client = new KafkaClient(opts);
  const producer = new HighLevelProducer(client);
  producer.on('ready', function() {
    producer.send(payloads, () => {
      producer.close(callback);
    });
  });
}


describe('test/kafka.test.js', () => {

  describe.skip('kafka-node test', () => {

    it('producer', (done) => {

      const messages = `${(new Date()).toString()}: this is kafka-node message`;

      sendMessage(
        { kafkaHost: 'localhost:9092' },
        [{ topic: 'ehr', messages }],
        done
      );

    });

  });

  describe('egg-kafka test', () => {

    it('producer', async () => {
      let app = mm.app({
        baseDir: 'kafkaapp',
      });

      await app.ready();

      const messages = `${(new Date()).toString()}: this is test message`;
      await app.kafka.send([{ topic: 'ehr', messages }]);
    });

    it('consumer', (done) => {
      let app = mm.app({
        baseDir: 'consumerapp',
      });

      const messages = `${(new Date()).toString()}: this is kafka-node message`;
      app.ready().then(() => {

        app.messenger.once(app.config.kafka.event, data => {
          done();
        });

        sendMessage(
          { kafkaHost: 'localhost:9092' },
          [{ topic: 'composition', messages }]
        );


      }, done);
    });

  });

});
