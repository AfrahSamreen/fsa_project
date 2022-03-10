const mongoose = require('mongoose');

const userModel = mongoose.model('user', {
    firstName: {
        type: String,
        minLength: [3, 'Min. 3 characters'],
        maxLength: [100, 'Max 100 characters'],
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
            validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
            message: () => 'Invalid Email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: { type: Number, default: 0 },
    gender: String,
    active: { type: Boolean, default: 1 },
    gender: Number,
    mobile: {
        type: String,
        validate: {
            // 123-456-7890
            validator: v => /[0-9]{10}/.test(v),
            message: () => 'Invalid Phone number'
        }
    },
    qualification: Number, // UG: 1, PG:2, 10+2: 0
    degree: Number,
    image: String,
    resume: String,
    skills: [String],
    passout: Number,
    createdAt: Date,
    updatedAt: { type: Date, default: Date.now() }
});

module.exports = userModel;