# egg-kafka #
基于[eggjs](https://eggjs.org/zh-cn/index.html)的kafka消息处理插件。

## 安装 ##
```bash
npm install git+ssh://git@github.com:kiba-zhao/egg-kafka.git --save
```

## 启用 ##
设置启用plugin: `config/plugin.js`
```javascript
exports.kafka = {
  enable:true,
  package:'egg-kafka'
};
```

## 配置 ##
配置过滤规则: `config/config.default.js`
```javascript
exports.kafka = {
    event: 'kafka_message',   //ipc消息key
    topics: { //消费者订阅的主题
      // 主题: 处理消息的任务
      composition: ['composition_consumer'] 
    },
    // 消费者选项： 如不配置，则不会订阅主题消息
    consumerGroup: {
      groupId: app.name,
      sessionTimeout: 15000,
      protocol: ['roundrobin'],
      encoding: 'utf8',
      fromOffset: 'latest',
      outOfRangeOffset: 'earliest'
    },
    // 客户端配置
    client: {
      kafkaHost: 'localhost:9092'
    }
};
```

## 生产者示例 ##
```javascript
const { Service: Model } = require('egg');
class Demo extends Model{
    async send(topic,messages){
        const {app} = this;
        await app.kafka.send([{topic,messages}]);
        return true;
    }
}
```

## 消费者示例 ##
```javascript
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

```


