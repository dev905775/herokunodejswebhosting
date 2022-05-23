// login and registrtion video link :- https://www.youtube.com/watch?v=bQZB4DD1Sc4
// this use login system

// import mongoose from 'mongoose';
const mongoose = require('mongoose');

// Defining Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique:true},
    password: {type: String, required: true, trim: true },
    join: { type: Date, default: Date.now }
})

// Compiling Schema
const UserModel = mongoose.model('user', userSchema)

// export default UserModel;
module.exports = UserModel;