const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const BlogComment = require('../models/Comments');
const Blog = require('../models/Blog')

// Get all comments

router.get('/', (req, res, next) => {
    BlogComment.find()
    .select(' blogId blogComment _id ')
    .populate('blogId')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            comments: docs.map(doc => {
                return {
                    _id: doc._id,
                    blogId: doc.blogId,
                    blogComment: doc.blogComment,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:2023/comments/' + doc._id
                    }
                }
            }),
            
        })
    })
    .catch(err => {
        res.status(500).json(err => {
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    // Comment being added even with the wrong id...nedds to be fixed!
    Blog.findById(req.body.blogId)
    .then(blog => {
        const blogComment = new BlogComment({
            _id: mongoose.Types.ObjectId(),
            blogComment: req.body.blogComment,
            blogId: req.body.blogId
            
        });
        return blogComment
            .save()
            
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Comment added successfully',
            createdComment: {
                _id: result._id,
                blogId: result.blogId,
                blogComment: result.blogComment
            },
            request: {
                type: 'GET',
                url: 'http://localhost:2023/comments/' + result._id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
    

});

// router.get('/:commentId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Comments Details!',
//         commentId: req.params.commentId
//     })
// })

// router.delete('/:commentId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Comments Deleted!',
//         commentId: req.params.commentId
//     })
// })

module.exports = router