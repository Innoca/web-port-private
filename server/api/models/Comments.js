const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true,
    },
    blogComment: {
        type: String,
        default: ""
    }

})


module.exports = mongoose.model('blogComment', commentSchema)