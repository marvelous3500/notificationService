import express from 'express'
import  * as emailService from '../util/emailService'
import * as  notification from '../controller/notificationController'
import * as  emailProducer  from '../Producers/producer'


const router = express.Router()

router.post('/', async (req, res) => {
    let message  = {
        "senderEmail": req.body.senderEmail,
        "recipientEmail": req.body.recipientEmail,
        "message": req.body.message,
        "subject": req.body.subject,
    }

    try {
        await emailService.sendEmail(message);
        await emailProducer.sendEmailProducer(message);
        message.status = true

        await notification.logNotification(message);
        res.json({message: "email sent succesfully "}).status(200);
      

    } catch (error) {
        message.status = false;
        res.json({message: error}).status(500)
    }

  
})

module.exports = router;


