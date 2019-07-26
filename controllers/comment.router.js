const express = require('express');
const router = express.Router();
const { CommentModel, Comment, Reply } = require('../models/comment.model');

router.post('/cmt', (req,res)=>{
    const { content, postId } = req.body;
    // const content = req.body.content;
    // const postId = req.body.postId;
    const author = req.userId;
    Comment.createComment(author,postId,content)
    .then(comment=>res.send(
        {
            code: 1,
            data: comment,
            message: 'Comment sucessful!'
        }
    ))
    .catch(error=>res.send(
        {
            code: 0,
            data: null,
            message: error.message
        }
    ))
})
router.delete('/delete', (req,res)=>{
    const userId = req.userId;
    const {postId, commentId} = req.body;
    Comment.deleteComment(userId, postId, commentId)
    .then(delcmt => res.send({
        code: 1,
        data: null,
        message: 'Delete comment sucess!'
    }))
    .catch(error => res.send({
        code: 0,
        data: null,
        message: error.message
    }))
})
router.post('/reply', (req,res)=>{
    const content = req.body.content;
    const userId = req.userId;
    const commentId = req.body.commentId;
    Reply.replyComment(userId, commentId, content)
    .then(reply => res.send({
        code: 1,
        data: reply,
        message: 'Reply post sucess!'
    }))
    .catch(error => res.send({
        code: 0,
        data: null,
        message: error.message
    }))
})
module.exports = router;