import { Router } from 'express';
const router = Router();
import { Types } from 'mongoose';
import multer, { diskStorage } from 'multer';

import { blogs_get_all } from '../controllers/blogs';

const storage = diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

import Blog, { findById, deleteOne } from '../models/Blog';



// 
router.get('/', blogs_get_all)

router.post('/', upload.single('blogImage'), (req, res, next) => {
    const blog = new Blog({
        _id: new Types.ObjectId(),
        blogTitle: req.body.blogTitle,
        blogContent: req.body.blogContent,
        blogImage: req.file.path
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
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:2010/blogs/' + result._id
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
});

// Get by Id
router.get('/:blogId', (req, res, next) => {
    const id = req.params.blogId;
    findById(id)
        .select('blogTitle blogContent _id blogImage')
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json({
                    blogTitle: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:2010/blogs/' + doc.id
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
});



router.delete('/:blogId', (req, res, next) => {
    const id = req.params.blogId;
    deleteOne({ _id: id })
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
});


// // Edit
// router.patch('/:blogId', checkAuth, (req, res, next) => {
//     const id = req.params.blogId
//     const updateOps = {};

//     for (const ops of req.body) {
//         updateOps[ops.propTitle] = ops.value;
//     }
//     Blog.updateMany({ _id: id }, { $set: updateOps})
//     .exec()
//     .then(result => {
//         res.status(200).json({
//             message: "Blog Updated",
//             request: {
//                     type: 'GET',
//                     url: 'http://localhost:2010/blogs/' + id
//                 }
//         })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     })
// })




export default router