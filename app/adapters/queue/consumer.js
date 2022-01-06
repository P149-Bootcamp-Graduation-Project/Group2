const {consumer} = require("./commons/commonKafka");

const test = [
  {
    id: 1,
    temp: "20",
  },
];
const topic=process.argv[2] || "TempLog"


//test1();
//createProducer("TempLog",test)
createConsumer()
async function createConsumer() {
  try {
      if(topic !=="TempLog" && topic!=="GpsLog" ){
          console.log("please return a valid topic")
          return 
      }

    console.log("Consumer'a bağlanılıyor....");
    await consumer.connect();
    console.log("Consumer'a bağlantı başarılı");

    //Consumer subscribe
    await consumer.subscribe({
      topic: topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
          const x=JSON.parse(result.message.value)
          console.log(x.id)
       /*  console.log(
          `Gelen mesaj ${JSOn.parse(result.message.value.id)} :Partition :=> ${result.partition}`
        ); */
      },
    });
   // await consumer.disconnect()
  } catch (error) {
    console.log(error);
  }
}


/* 
async function test1() {
  await producer.connect();
  console.log("coneection başarılı");
  const message_result = await producer.send({
    topic: "TempLog",
    messages: [
      {
        value: "Bu bir test log mesajıdır",
        partition: 0,
      },
    ],
  }); 

  console.log("gÖNDERİM İŞLEMİ BAŞARILIDIR", JSON.stringify(message_result));
  await producer.disconnect();
}
*/