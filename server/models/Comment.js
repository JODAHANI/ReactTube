import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new Schema({
    comments : [
        {
            wrtier: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ]
    
},{timestamps : true})

// const replySchema = new Schema({
//     wrtier: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     text: {
//         type: String
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// })

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment
