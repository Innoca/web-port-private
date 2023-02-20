const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogTitle: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blogContent: {
        type: String,
        required: true
    },
    blogImage: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Blog', blogSchema)