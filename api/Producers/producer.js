const { Kafka } = require("kafkajs")
require("dotenv").config();
import * as consumer from '../consumers/emailconsumer'

export async function sendEmailProducer( message){
    try {

         const clientId =  "notification-service";
         const brokers  = ['localhost:9092'];
         const kafka = new Kafka({ clientId, brokers })
         const producer = kafka.producer()

        let topic = process.env.SENT_EMAIL_TOPIC;

        await producer.connect();
        await producer.send({
            topic,
            messages: [
                {
                    key: "sending email notification",
                    value: JSON.stringify(message),
                },
            ],
        })
        await producer.disconnect();
    } catch (error) {
        console.error(error)
       
    }
}
