import mongoose, { Schema } from "mongoose";
const Schema = mongoose.Schema

const videoSchema = new mongoose.Schema({
    writer : {
        type : Schema.Types.ObjectId,
        ref: 'User'
    }, 
    title : {
        type : String,
        maxlength : 50,
    },
    description : {
        type : String,
    },
    privacy : {
        type : Number
    },
    category : {
        type : String
    },
    views : { 
        type : Number,
        default : 0
    },
    thumbnail : {
        type : String
    }
    
},{timestamps : true})


const video = mongoose.model('User', videoSchema)
export default video