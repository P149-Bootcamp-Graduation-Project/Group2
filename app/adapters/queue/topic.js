const { admin } = require("../queues/commons/commonKafka");

createTopic();

async function createTopic() {
  try {
    console.log("Kafka Broker'a bağlanılıyor...");
    await admin.connect();
    console.log("Kafka Broker'a bağlanıldı.Topic üretiliyor...");

    await admin.createTopics({
      topics: [
        {
          topic: "TempLog",
          numPartitions: 1,
        },
        {
          topic: "GpsLog",
          numPartitions: 1,
        },
      ],
    });

    console.log("Topic üretildi");
    await admin.disconnect();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
}
