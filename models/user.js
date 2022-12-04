const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)

// This module lets you authenticate using a username and password in your Node.js applications. 
// By plugging into Passport, password-based sign in can be easily and unobtrusively integrated into any 
//application or framework that supports Connect-style middleware, including Express.