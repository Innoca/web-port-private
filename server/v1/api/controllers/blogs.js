import Blog from '../models/Blog';
const mongoose = require('mongoose')

import Likes from '../models/Likes'


// Collect all blogs
export function blogs_get_all(req, res, next) {
    Blog.find()
        .select('blogTitle blogContent _id blogImage userId')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                blogs: docs.map(doc => {
                    return {
                        blogTitle: doc.blogTitle,
                        blogContent: doc.blogContent,
                        blogImage: doc.blogImage,
                        userId: doc.userId,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:2023/blogs/' + doc._id
                        }
                    }
                })
            };

            res.status(200).json(response)



        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}


// Create a blog
export function blogs_create_one(req, res, next) {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        blogTitle: req.body.blogTitle,
        blogContent: req.body.blogContent,
        blogImage: req.file.path,
        userId: req.body.userId
    });

    blog.save()
        
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Created blog successfully',
                createdBlog: {
                    blogTitle: result.blogTitle,
                    blogContent: result.blogContent,
                    blogImage: result.blogImage,
                    userId: result.userId,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:2023/blogs/' + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}



// Collect one blog by its id
export function blogs_get_one(req, res, next) {
    const id = req.params.blogId;
    Blog.findById(id)
        .select('blogTitle blogContent _id blogImage userId')
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json({
                    blogTitle: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:2023/blogs/' + doc.id
                    }
                })
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                })
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err })
        });
}


// Update a blog by its id
export function blogs_update_one(req, res, next) {
    const id = req.params.blogId;
    const updateOps = {};
  
    // Expecting JSON object with key-value pairs for blogTitle and blogContent
    if (req.body.blogTitle) {
      updateOps.blogTitle = req.body.blogTitle;
    }
    if (req.body.blogContent) {
      updateOps.blogContent = req.body.blogContent;
    }
    
    console.log(updateOps)
    Blog.findByIdAndUpdate({ _id: id }, { $set: updateOps })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "Blog Updated",
          request: {
            type: "GET",
            url: "http://localhost:2023/blogs/" + id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
  
  

// Delete a blog by its id
export function blogs_delete_one(req, res, next)  {
    const id = req.params.blogId;
    Blog.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Blog Deleted',
                request: {
                    type: 'DELETE',
                    url: 'http://localhost:2023/blogs',
                    body: {
                        blogTitle: 'String', blogContent: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

export function blog_likes(req, res, next) {
    const id = req.params.blogId

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400)
        .send({
            message: "Invalid Blog ID",
            data: {}
        });
    }

    Blog.findOne({ _id: id})
    .then((blog) => {
        if(!blog) {
            return res.status(400).send({
                message: 'No blog found',
                data: {}
            })
        } else {
            let current_user = req.user

            blog_likes.findOne ({
                blogId: blog,
                userId: userId

            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}