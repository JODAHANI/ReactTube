import User from "../models/User";

export const auth = (req, res, next) => {
    let token = req.cookies.auth;
    User.analyzer(token, (err, user) => {
        if (user == null) {
            return res.json({
                isAuth: false,
                err: true
            })
        }
        req.token = token;
        req.user = user
        console.log(user,token)
        next();
    })
}