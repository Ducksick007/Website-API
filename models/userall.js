const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
}); 

UserSchema.pre('save', function(next) {
    const user = this;

    // ตรวจสอบว่ามีการเรียกใช้งานการเข้ารหัสหรือไม่
    if (!user.isModified('password')) {
        return next();
    }

    // เข้ารหัสรหัสผ่าน
    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash;
        next();
    }).catch(error => {
        console.error(error);
        next(error);
    });
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
