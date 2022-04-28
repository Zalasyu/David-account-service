const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({ 
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
    birthDate: Date
});

const Account = mongoose.model('accounts', accountSchema);

module.exports = { Account };
