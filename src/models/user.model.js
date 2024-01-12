const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: [true, 'Name is required']
    },
    dob: {
        type: Schema.Types.Date,
        required: [true, 'Date of birth is required']
    },
    email: {
        type: Schema.Types.String,
        required: [true, 'Email is required'],
        unique: true
    },
    username: {
        type: Schema.Types.String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'Password is required']
    },
});

const UserModal = model('user', userSchema);
module.exports = UserModal;