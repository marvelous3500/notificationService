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
        
      //  await emailProducer.sendEmailProducer(message);
        await emailService.sendEmail(message);
        res.json({message: "email sent succesfully "}).status(200);
        message.status = true

    } catch (error) {
        message.status = false;
        res.json({message: error}).status(500)
    }
    
    await notification.logNotification(message);
  
})

module.exports = router;


