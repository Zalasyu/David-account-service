const mongoose = require('mongoose');
const fanSchema = new mongoose.Schema({




});

// TODO: Find a way to take in a Date Data Type for birthDate field.
const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true,
        unique: true
    }, 
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    role: {
        type: String,
        default: "fan",
        enum: ["fan", "artist", "venue"]
    },
    accessToken: String,
    profilePic: String, 
    birthDate: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;
