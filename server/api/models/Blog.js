const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogTitle: {
        type: String,
        required: true
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