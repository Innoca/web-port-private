const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes');

// Add a new like
router.post('/', likesController.addLike);

// Get all likes for a post
router.get('/blogs/:blogId', likesController.getLikesByBlogId);

// Get all likes by a user
router.get('/user/:userId', likesController.getLikesByUserId);

// Delete a like
router.delete('/:likeId', likesController.deleteLike);

module.exports = router;
