import { Router } from 'express';
const router = Router();
import { Types } from 'mongoose';
import multer, { diskStorage } from 'multer';

import { blogs_create_one, blogs_delete_one, blogs_get_all, blogs_get_one, blogs_update_one } from '../controllers/blogs';



import checkAuth from '../middleware/check-auth'; 



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
router.get('/', checkAuth, blogs_get_all)

router.get('/:blogId', checkAuth, blogs_get_one)

router.post('/', checkAuth, upload.single('blogImage'), blogs_create_one);

router.patch('/:blogId', checkAuth, blogs_update_one)

// Get by Id




router.delete('/:blogId', blogs_delete_one);


// // Edit





export default router;