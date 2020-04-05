const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    subscriptions: [{type: String}]
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({
        _id : this._id,
        name: this.name,
        email: this.email}, 
    "jwtPrivateKey");
}
userSchema.methods.handleSubcription = function(source) {
    // find source
    const index = this.subscriptions.indexOf(source.id);
    // if found
    if( index !== -1) {
        this.subscriptions.splice(index,1);
        return 'Source UnSubscribed Successfully'
    }
    // if not found
    this.subscriptions.push(source.id);
    return 'Source Subscribed Successfully'
}
const User = mongoose.model("User", userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(12).required()
    });

    return schema.validate(user);
};

exports.UserSchema = userSchema;
exports.User = User;
exports.validate = validateUser;