const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
 
dotenv.config({path:'./config.env'})

require('./db/conn')
//const User= require('./model/userSchema');

app.use(express.json());

//linking router files to make route easy 
app.use(require('./router/auth'));

const PORT =process.env.PORT;

//Middelware
//const middleware=(req,res,next) => {
   // console.log('hello middleware');
   // next();
//}

//app.get('/',(req,res) => {
//  res.send('Hello from the server app js');
//});

/* app.get('/profile',(req,res) => {
    console.log('Hello Profile');
    res.send('Hello about from the server');
}); */

app.get('/contact',(req,res) => {
    //res.cookie("Test",'niyati'); 
    res.send('Hello contact from the server');
});

app.get('/login',(req,res) => {
    res.send('Hello login from the server');
});

app.get('/signup',(req,res) => {
    res.cookie("test",'cookie1');
    res.send('Hello registration from the server');
});


app.listen(PORT, ()=> {
    console.log(`server is running at port ${PORT}`);
})

