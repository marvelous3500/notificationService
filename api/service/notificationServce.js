import { where } from 'sequelize';

const notification =require('../../models').Notification_log

export async function logNotification(mesage){
    let payload = {
        "status": mesage.status,
        "username": mesage.username,
        "email": mesage.senderEmail
    }

    return await notification.create(payload);
}
