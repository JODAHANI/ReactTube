import express from 'express';
import Subscriber from '../models/Subscriber';
const subscribe = express.Router();

subscribe.post("/",  async (req, res) => {
    const {body : {userTo}} = req;
    let subscriber = await Subscriber.findOne({userTo});
    console.log(subscriber)
    return res.json({success: true, subscriber});
})


subscribe.post("/on-subscribe",  async (req, res) => {
    const {body  : {
        userToId,
        userFromId,
    }} = req;
    let subscriber = await Subscriber.findOne({userTo : userToId});
    let find = subscriber.userFrom.indexOf(userFromId)
    if(find === -1) {
        subscriber.userFrom.push(userFromId)
        await subscriber.save()
    }
    return res.json({success: true, subscriber});
})


export default subscribe