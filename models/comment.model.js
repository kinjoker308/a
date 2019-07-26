const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {UserModel} = require('./user.model')
const {PostModel} = require('./post.model')
const CommentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    post: { type: Schema.Types.ObjectId, ref: 'post' },
    content: String,
    likes: [
        { type: Schema.Types.ObjectId, ref: 'user' }
    ],
    replies: [
        {
            author: { type: Schema.Types.ObjectId, ref: 'user' },
            content: String,
            likes: [
                { type: Schema.Types.ObjectId, ref: 'user' }
            ]
        }
    ]
})
class Comment{
    static async createComment(userId, postId, content){
        if(!userId || userId == '')
            throw new Error ('Missing user!')
        if(!postId || postId == '')
            throw new Error ('Missing post!')
        if(!content || content == '')
            throw new Error ('Please fill content!')
        if(!mongoose.Types.ObjectId.isValid(userId))
            throw new Error ('User ID invalid!')
        if(!mongoose.Types.ObjectId.isValid(postId))
            throw new Error ('Post ID invalid!')
        const user =  await UserModel.findById(userId)
        if(!user)
            throw new Error ('Cannot find user!')
        const post = await PostModel.findById(postId)
        if(!post)
            throw new Error('Cannot find post!')
        const comment = await CommentModel.create(
            {author: userId, post: postId, content}
        )
        if(!comment)
            throw new Error('Cannot create comment!')
        const postCommented = await PostModel.findByIdAndUpdate(postId,
            {$push: {comments: comment._id}},
            {new: true}
        )
        if(!postCommented)
            throw new Error ('Cannot update post!')
        return {
            _id: comment._id,
            content: comment.content
        }
    }
    /**
     * 
     * @param {*} userId người xóa cmt phải là người tác giả cmt hoặc tác giả bài post 
     * @param {*} postId bài post chứa cmt
     * @param {*} commentId cmt cần xóa
     */
    static async deleteComment(userId,postId,commentId){
        if(!userId || userId == '')
            throw new Error ('Missing user!')
        if(!postId || postId == '')
            throw new Error ('Missing post!')
        if(!commentId || commentId == '')
            throw new Error ('Missing comment!')
        const post =  await PostModel.findById(postId)
        if(!post)
            throw new Error ('Post is not exist!')
        const authorcmt = await UserModel.findById(userId)
        if(!authorcmt || authorcmt != userId || authorcmt != post.author)
            throw new Error ('You cant delete post!')
            const delcmt = await CommentModel.findOneAndDelete(commentId)
        if(!delcmt)   
            throw new Error ('Comment is not exist!')
        return delcmt;
    }
}
class Reply{
    static async replyComment(userId, commentId, content){
        if(!userId || userId == '')
            throw new Error ('Missing user!')
        if(!commentId || commentId == '')
            throw new Error ('Missing comment!')
        if(!content || content == '')
            throw new Error ('Please fill content!')
        if(!mongoose.Types.ObjectId.isValid(userId))
            throw new Error ('User ID invalid!')
        const user =  await UserModel.findById(userId)
        if(!user)
            throw new Error ('Cannot find user!')
        const cmt = await CommentModel.findById(commentId)
        if(!cmt)
            throw new Error('Cannot find comment!')
        const reply = await CommentModel.findByIdAndUpdate(
            commentId,
            {$push: {
                author: userId,
                content: content
            }}
        )
        if(!reply)
            throw new Error ('Cannot update comment!')
        return {
            _id: reply._id,
            content: reply.content
        }
    }
}
const CommentModel = mongoose.model('comment', CommentSchema);
module.exports = { CommentModel, Comment, Reply }