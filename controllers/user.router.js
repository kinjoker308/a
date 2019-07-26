const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model')
const { authenticate } = require('../helpers/authenticate')

router.post('/register', (req, res)=>{
    const {email, name, password} = req.body
    User.signUp(email, name, password)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
            message: 'Signup sucessful'
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
})

router.post('/login',(req, res)=>{
    const { email, password } = req.body
    User.signIn(email, password)
    .then(user=>{
        res.send({
            code: 1,
            data: user,
            message: ''
        })
    })
    .catch(error=>{
        res.send({
            code: 0,
            data: null,
            message: error.message
        })
    })
})

router.post('/send-friend-request', authenticate, (req, res)=>{
    const { idReceiver } = req.body
    const idSender = req.userId;
    User.sendFriendRequest(idSender,idReceiver)
    .then(result=>res.status(200).send({
        code: 1,
        data: result, // result: true
        message: 'Send friend request successfuly!'
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})
router.post('/accept-friend-request', authenticate, (req, res)=>{
    const { idReceiver } = req.body // 
    const idSender = req.userId; // user login
    User.acceptFriend(idSender, idReceiver)
    .then(result=>res.status(200).send({
        code: 1,
        data: result, // result: true
        message: 'Set friend successfuly!'
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})
router.post('/like',authenticate, (req,res)=>{
    const userId = req.body;
    const postId = req.body.postId;
    User.likePost(userId, postId)
    .then(likePost => res.send({
        code: 1,
        data: likePost,
        message: 'Liked this post!'
    }))
    .catch(err=>res.send({
        code: 0,
        data: null,
        message: err.message
    }))
})

module.exports = router;