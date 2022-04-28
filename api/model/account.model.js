const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({ 
    "_id": "string",
    "username": {
        "type": "string",
        "required": true,
        "minlength": 5,
        "maxlength": 50,
        "unique": true
    }, 
    "fName": {
        "type": "string",
        "required": true,
    }, 
    "lName": {
        "type": "string",
        "required": true,
    }, 
    "email": {
        "type": "string",
        "required": true,
        "minlength": 5,
        "maxlength": 255,
        "unique": true
    }, 
    "password":{
        "type": "string",
        "required": true,
        "minlength": 5,
        "maxlength": 1024,
    },
    "role": "string",
    "profilePic": "string", 
    "birthDate": "date"
});

const Account = mongoose.model('accounts', accountSchema);

module.exports = { Account };
