import express from 'express';
import Subscriber from '../models/Subscriber';
import User from '../models/User'
const subscribeRouter = express.Router();

subscribeRouter.post("/",  async (req, res) => {
    const {body : {userTo}} = req;
    let subscriber = await Subscriber.findOne({userTo});
    return res.json({success: true, subscriber});
})


subscribeRouter.post("/on-subscribe",  async (req, res) => {
    const {body  : {
        userToId,
        userFromId,
    }} = req;
    if(userToId == userFromId) {
        return res.json({success: false,});
    }
    let subscriber = await Subscriber.findOne({userTo : userToId});
    let user = await User.findById(userToId)
    let find = subscriber.userFrom.indexOf(userFromId)
    if(find === -1) {
        subscriber.userFrom.push(userFromId)
        subscriber.total = subscriber.total + 1;
        await subscriber.save()
        user.subscriber = subscriber.total;
        await user.save()

    } else {
        subscriber.userFrom.splice(find, 1);
        subscriber.total = subscriber.total - 1;
        await subscriber.save()
        user.subscriber = subscriber.total;
        await user.save()
    }
    return res.json({success: true, subscriber});
})


export default subscribeRouter