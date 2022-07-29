import mongoose,{ Schema } from "mongoose";


const subscriberSchema = new mongoose.Schema({
    total : {
        type : Number,
        default : 0
    },
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom : {
        type: Array,
        default : []
    }

}, { timestamps: true })


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

export default Subscriber