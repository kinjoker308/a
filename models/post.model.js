const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { UserModel, User } = require('../models/user.model');
// const UserModel = require('./user.model').UserModel
console.log(UserModel)
const { CommentModel } = require('../models/comment.model');
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
class Post{
    /**
     * 
     * @param {*} author user id 
     * @param {*} content content's post
     * @return Promise
     */
    static async createPost(userId, content){
        console.log(userId)
        // if(!userId || userId == '')
        //     throw new Error ('Missing author!');
        // if(!content || content == '')
        //     throw new Error ('Plz fill content!');
        // if(!mongoose.Types.ObjectId.isValid(userId))
        //     throw new Error ('User id invalid!');
        const userPost = await UserModel.findById(userId).catch(e=>console.log(e));
        if(!userPost) throw new Error ('Cannot find author!');
        const newPost = await PostModel.create(
            {author: userId, content}
        )
        if(!newPost) throw new Error ('Cannot create post!');
        const author = await UserModel.findOneAndUpdate(
            userId,
            {$addToSet:{posts: post._id}}
        )
        if(!author) throw new Error ('Cannot update author!');
        return {
            post: {
                _id: post._id,
                content: post.content
            }
        }
    }
    /**
     * 
     * @param {*} userID tac gia cua post
     * @param {*} postID bai post can delete
     */
    static async deletePost(userID, postID){
        if(!userID || userID == '')
        throw new Error ('Missing user!')
    if(!postID || postID == '')
        throw new Error ('Missing post!')
    const post = await PostModel.findById(postID)
    if(!post)
        throw new Error ('Post not exist!')
    if(userID != post.author)
        throw new Error ('You cant delete this post!')
    const cmtdel = await CommentModel.deleteMany({post: postID});
    const postdel = await PostModel.findByIdAndDelete(postID)
    return true;
    }
}
const PostModel = mongoose.model('post', PostSchema);
module.exports = { PostModel, Post }