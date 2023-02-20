const mongoose = require('mongoose');

const querySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userQuery: {
        type: String,
        default: ""
    }

})


module.exports = mongoose.model('UserQuery', querySchema)