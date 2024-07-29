const { Schema, model } = require('mongoose');
const { createHmac, randomBytes } = require('crypto');

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/images/default.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, {
    timestamps: true
});

// Pre-save hook to hash password
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    // Generate a new salt and hash the password
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');

    user.salt = salt;
    user.password = hashedPassword;
    next();
});

// Static method to check if passwords match
userSchema.statics.matchPassword = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const hashedPassword = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

    if (user.password !== hashedPassword) throw new Error('Incorrect Password');

    return user;
}

const User = model('User', userSchema);

module.exports = User;
