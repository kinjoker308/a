require('./helpers/dbconnect')
const express = require('express');
const app = express();
const parser = require('body-parser');
const {authenticate} = require('./helpers/authenticate');
app.use(parser.json())

const userRouter = require('./controllers/user.router');
const postRouter = require('./controllers/post.router');
const commentRouter = require('./controllers/comment.router');

app.use('/user', userRouter);
app.use('/post', authenticate, postRouter);
app.use('/comment', authenticate, commentRouter);


module.exports = app;