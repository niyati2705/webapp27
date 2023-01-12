const express= require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authenticate=require("../middleware/authenticate");

const cookieParser =require("cookie-parser");
router.use(cookieParser())

require('../db/conn')
const User= require("../model/userSchema");

router.get('/',(req,res) => {
    res.send('Hello from the server router js');
});

router.post('/register',async(req,res) => {  
    
    const {name, email, phone, rollno, password, cpassword}= req.body;
    
    if(!name || !email || !phone || !rollno || !password || !cpassword ) 
       {
        return res.status(422).json({error: "Pls fill the field properly"});
       }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist) {
            return res.status(422).json({error: "Email already exists"});

        }else if(password != cpassword) {
            return res.status(422).json({error: "password does not match"});

        }else {
            const user = new User({name, email, phone, rollno, password, cpassword});

            //const userRegister=
              userRegister = await user.save();

              res.status(201).json({message:"user registered successfully"});
        }   
     
    } catch(err) {
    console.log(err);
    }
    
   // res.json({message: req.body});
    //res.send('Register page');
});

//login route
router.post('/login',async (req,res) => {
   try{
        let token;
        const{email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message:"Pls fill the details"});
        }  
        
        const userLogin = await User.findOne({email:email});

        //console.log(userLogin);

        if(userLogin)
        {
            const isMatch= await bcrypt.compare(password, userLogin.password);

             token= await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now()+25892000000),//token will expire in 30 days
                httpOnly:true  
            });

            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"});
            }else{
                res.json({message:"user signin successful"});
            }    

        } else{
            res.status(400).json({error:"Invalid Credentials"});
        }       

   } catch(err){
     console.log(err);
   }

});

//profile page
router.get('/profile',authenticate,(req,res) => {
    console.log('Hello Profile');
    res.send(req.rootUser);
});

//get user data for contact us and home page
router.get('/getdata', authenticate, (req,res) => {
    console.log('Hello contact');
    res.send(req.rootUser);
})

//logout page
router.get('/logout',(req,res) => {
    console.log('Hello Logout');
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User Logout');
});

module.exports = router;