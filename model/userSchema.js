const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    work: {
        type: String,
        required:true
    },

    password:{
        type: String,
        required: true
    },

    cpassword: {
        type: String,
        required:true
    }
})


//hashing password
userSchema.pre('save', async function(next) {
      console.log("hi from inside");
      
    if (this.isModified('password')) {
        this.password= bcrypt.hashSync(this.password, 12);
        this.cpassword= bcrypt.hashSync(this.cpassword, 12);
    }
    next();
});

const User = mongoose.model('USER',userSchema);

module.exports = User;