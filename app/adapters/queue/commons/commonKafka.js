const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka_log_store_client",
  brokers: ["localhost:39092"],
});

const admin=kafka.admin()
const producer=kafka.producer()
const consumer=kafka.consumer({
  groupId: "log_store_consumer_group",
})

module.exports = {
  admin,
  producer,
  consumer
};
