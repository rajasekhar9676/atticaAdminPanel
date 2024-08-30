const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    // address: { type: String, required: true }
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    console.log('Password before hashing:', this.password);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Password after hashing:', this.password);
    next();
});

// Method to compare hashed passwords
// userSchema.methods.matchPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

userSchema.methods.matchPassword = async function (password) {
    console.log('Plain text comparison:', password === this.password);
    return password === this.password; // Compare plain text for testing
};


module.exports = mongoose.model('User', userSchema);


