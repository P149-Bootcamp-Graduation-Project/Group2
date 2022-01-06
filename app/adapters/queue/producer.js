const { producer } = require("./commons/commonKafka");

async function createProducer(topicName, object) {
  try {
    console.log("producere bağlanılıyor...");
    await producer.connect();
    console.log("producere bağlantı başarılı..");

    let messages = object.map((item) => {
      return {
        value: JSON.stringify(item),
        partition: 0,
      };
    });

    const message_result = await producer.send({
      topic: topicName,
      messages: messages,
    });
    console.log("gÖNDERİM İŞLEMİ BAŞARILIDIR", JSON.stringify(message_result));
    await producer.disconnect();
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}
module.exports = createProducer;
