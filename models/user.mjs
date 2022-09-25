import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        maxlength: 255
    }
}, { timestamps: true });

const recordSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toISOString()
    },
    money: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 20
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
    },
    categoryName: {
        type: String
    },
    description: {
        type: String,
        required: true,
        maxlength: 255
    },
}, { timestamps: false, strict: false });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    categories: [categorySchema],
    records: [recordSchema],
    total: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema, 'users');