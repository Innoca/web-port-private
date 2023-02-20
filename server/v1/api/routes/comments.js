import { Router } from 'express';
const router = Router();
import { Types } from 'mongoose';

import BlogComment, { find } from '../models/Comments';
import { findById } from '../models/Comments';
import { add_blogComment, comment_delete_one, blogComment_get_all } from '../controllers/comments';
import checkAuth from '../middleware/check-auth';

const mongoose = require('mongoose')

// Get all comments

router.get('/', checkAuth, blogComment_get_all);

router.post('/', checkAuth, add_blogComment);

// router.get('/:commentId', (req, res, next) => {
//     res.status(200).json({
//         message: 'Comments Details!',
//         commentId: req.params.commentId
//     })
// })

router.delete('/:commentId', comment_delete_one)

export default router