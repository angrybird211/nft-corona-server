/**
 * User model
 * 
 * @since 1.0.0
 * @version 1.0.0
 * @package main/Models/Users
 */

import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    avatar: {
        type: String,
        default: "./images/faces/face15.jpg",
    },
    walletAddress: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLoggedIn: {
        type: Date
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    approved: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

export default User;
