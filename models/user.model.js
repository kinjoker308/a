const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    name: String,
    posts: [
        { type: Schema.Types.ObjectId, ref: 'post' }
        // post: collection name
    ],
    friends: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
    receiveRequests: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
    sendRequests: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ]
})

const UserModel = mongoose.model('user', UserSchema);
// UserModel.
console.log(UserModel)
module.exports = { UserModel }