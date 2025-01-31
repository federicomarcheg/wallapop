const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require('../utils/encription');




const UserSchema = new mongoose.Schema({
    name:{ Type: String, required: true},
    email:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    createdAt:{ type: Date, default: Date.now},
});




UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();


const userSchema = new mongoose.Schema({
    username: String,
    isOnline: { type: Boolean, default: false },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};



userSchema.pre('save', function (next) {
    if (this.isModified('sensitiveData')) {
        this.sensitiveData = encrypt(this.sensitiveData);
    }
})




module.exports = mongoose.model('User', UserSchema);
