import User from "../models/User";

export const auth = (req,res,next) => {
    function cb(result){
        req.token = token;
        req.user = result
        console.log(result)
        next();
    }
    let token = req.cookies.auth;
    User.analyzer(token,cb)
}