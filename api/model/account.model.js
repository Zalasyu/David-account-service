const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({ 
    _id: String,
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    }, 
    fName: {
        type: String,
        required: true,
    }, 
    lName: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    }, 
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    role: String,
    profilePic: String, 
    birthDate: Date
});

const Account = mongoose.model('accounts', accountSchema);

module.exports = { Account };
