const express= require('express');
const router = express.Router();

require('../db/conn')
const User= require("../model/userSchema");

router.get('/',(req,res) => {
    res.send('Hello from the server router js');
});

router.post('/register',async(req,res) => {  
    
    const {name, email, phone, work, password, cpassword}= req.body;
    
    if(!name || !email || !phone || !work || !password || !cpassword ) 
       {
        return res.status(422).json({error: "Pls fill the field properly"});
       }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist) {
            return res.status(422).json({error: "Email already exists"});
        }
        
        const user = new User({name, email, phone, work, password, cpassword});

        const userRegister= await user.save();

          res.status(201).json({message:"user registered successfully"});
     
    } catch(err) {
    console.log(err);
    }
    
   // res.json({message: req.body});
    //res.send('Register page');
});

//login route
router.post('/signin',async (req,res) => {
   try{
        const{email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message:"Pls fill the details"});
        }  
        
        const userLogin = await User.findOne({email:email});

        console.log(userLogin);

        if(!userLogin){
            res.status(400).json({error:"User error"});
        }else{
            res.json({message:"user signin successful"});
        }


   } catch(err){
     console.log(err);
   }

});

module.exports = router;