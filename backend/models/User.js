const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

const userSchema = new mongoose.Schema({
    username: String,
    isOnline: { type: Boolean, default: false },
});



module.exports = mongoose.model('User', UserSchema);
