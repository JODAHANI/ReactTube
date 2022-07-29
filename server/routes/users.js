import express from "express";
import User from "../models/User";
import {auth} from '../middleware/auth'
import Subscriber from "../models/Subscriber";
const userRouter = express.Router();


userRouter.get('/auth',auth, (req,res) => {
  res.status(200).json({
    id : req.user._id,
    isAuth : true,
    isAdmin : req.user.role === 0 ? false : true,
    email : req.user.email,
    name : req.user.name,
    role : req.user.role,
    image : req.user.image
  })
  // res.redirect('/')
})

userRouter.post('/login', async (req, res) => {
    const {body : {email,password}} = req;
    let user = await User.findOne({email})
    if(!user) {
      // return res.send('가입 된 ID가 없습니다.')
      return res.json({loginSuccess : false, message : '가입 된 메일이 없습니다.'})
    } 
    let userCompare = await user.comparePassword(password)
    if(!userCompare) {
      // res.send('비밀번호 틀렸어요!')
      res.json({loginSuccess : false , message : '비밀번호가 맞지 않습니다.'})
    } else {
      let currentUser = await user.generateToken();
      return res.cookie('auth',currentUser.token).status(200).json({
        loginSuccess : true,
        userId : user._id
      })
      
      // return res.redirect('/')
      // res.json({loginSuccess : true , user})
    }
  })
  
  
userRouter.post('/register', async (req, res) => {
  const {body : {name ,email,password,password2}} = req;
  console.log(name,email,password,password2)
  if(password != password2) {
    return res.json({ success: false, err: '패스워드가 일치하지 않습니다.'});
  } else {
    let user = await User.create({name,email,password})
    console.log(user)
    let subscriber = await Subscriber.create({
      userTo : user._id
    })
    console.log(subscriber)
    return res.status(200).json({success : true})
  }
})

userRouter.get('/logout',auth, async (req, res) => {
  let logoutUser = await User.findOneAndUpdate(
    {_id: req.user._id,},
    {token : ""},
    {new : true}
  );
  if(!logoutUser) return res.json({ success: false, err });
  return res.json({ success: true });
})

// app.get('/logout',auth, (req, res) => {
//   User.findOneAndUpdate({_id: req.user._id,},{token : ""},(err,doc) => {
//     if(err) return res.json({ success: false, err });
//     return res.status(200).json({isAuth: false,err: true})
//   });
// })


export default userRouter