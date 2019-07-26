require('mongoose')
.connect('mongodb://localhost/server2705',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})