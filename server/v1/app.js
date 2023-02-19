const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')


const blogRoutes = require('./api/routes/blog').default;
const commentRoutes = require('./api/routes/comments').default;
const usersRoutes = require('./api/routes/user').default;


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// To prevent CORS errors in the browser
app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control_allow-Methods', 'PUT,POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})
// const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://Ntaganzwa:'+ process.env.MONGO_ATLAS_PW +'@webdatabase.zskel1k.mongodb.net/test')

mongoose.Promise = global.Promise

// Routes handling requests
app.use('/blogs', blogRoutes);
app.use('/comments', commentRoutes);
app.use('/user', usersRoutes);


// managing errors
app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;