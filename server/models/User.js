import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";
import 'dotenv/config' 


const userSchema = new mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
});

userSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        let user = this
        let saltRounds = parseInt(process.env.SALT_ROUNDS)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(password) {
    let result = bcrypt.compare(password, this.password).then(result => {
        return result
    })
    return result
}

userSchema.methods.generateToken = async function() {
    let user = this
    let token = jwt.sign(user._id.toJSON(),process.env.HASH);
    user.token = token;
    await user.save()
    return user
    // let token = jwt.sign(usre., 'hash');
}

userSchema.statics.analyzer = function (token,cb) {
    let decoded = jwt.verify(token,process.env.HASH)
    this.findById(decoded).then(result => {
        cb(result)
        // cb(result)
    })
}

const User = mongoose.model('User',userSchema)
export default User