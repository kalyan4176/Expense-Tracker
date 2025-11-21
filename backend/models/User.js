const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        default: 0
    },
    currency: {
        type: String,
        default: 'INR'
    }
});

module.exports = mongoose.model('User', UserSchema);
