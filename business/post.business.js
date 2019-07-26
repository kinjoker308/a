const {UserModel} = require('../models/user.model');
const {PostModel} = require('../models/post.model');
const { CommentModel } = require('../models/comment.model');

module.exports = class Post{
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
      {$addToSet:{posts: userPost._id}}
    )
    if(!author) throw new Error ('Cannot update author!');
    return {
      post: {
        _id: userPost._id,
        content: userPost.content
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