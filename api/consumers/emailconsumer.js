const { Kafka } = require("kafkajs")
require("dotenv").config();
import  * as emailService from '../util/emailService'
import * as notificationServce from '../service/notificationServce'

 export async function sendEmail(messages){
    await emailService.sendEmail(messages);
    await notificationServce.logNotification(messages);
}

export async function sentEmailComsume(){
    const clientId =  "notification-service";
    const brokers  = ['localhost:9092'];
    const kafka = new Kafka({ clientId, brokers })

    const consumer = await kafka.consumer({ groupId: 'notification' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'sentEmail', fromBeginning: true })

    await consumer.run({
        eachMessage: ({ message }) => {
                  console.error({
                    key: message.key.toString(),
                    value: message.value.toString(),
                    headers: message.headers,
                }) 

            sendEmail(JSON.parse(message.value));
                

            },
        })
}

sentEmailComsume().catch(error => {console.error(error)})

