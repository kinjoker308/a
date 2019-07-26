const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: String,
    likes: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
    comments: [
        { type: Schema.Types.ObjectId, ref: 'comment' }
    ]
})

const PostModel = mongoose.model('post', PostSchema);
module.exports = { PostModel }