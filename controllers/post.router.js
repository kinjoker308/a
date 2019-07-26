const express = require('express')
const router = express.Router()
const {Post} = require('../models/post.model')

router.post('/create',(req,res)=>{
    const {content} = req.body
    const author = req.userId
    Post.createPost(author,content)
    .then(post=>res.send({
        code: 1,
        data: post,
        message: 'Post create successful'
    }))
    // .catch(error=>res.send({
    //     code: 0,
    //     data: null,
    //     message: error.message
    // }))
})

router.delete('/deletepost', (req,res)=>{
    const userId = req.userId
    const postId = req.body.postId
    Post.deletePost(userId, postId)
    .then(deletePost=>res.send({
        code: 1,
        data: null,
        message: 'Post deleted'
    }))
    .catch(error=>res.send({
        code: 0,
        data: null,
        message: error.message
    }))
})
module.exports = router;