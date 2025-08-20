const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

