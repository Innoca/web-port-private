const Like = require('../models/Likes');

// Add a new like
exports.addLike = (req, res) => {
  const { userId, blogId } = req.body;
  
  const like = new Like({
    userId: userId,
    blogId: blogId
  });

  like.save()
    .then((result) => {
      res.status(201).json({
        message: 'Like added successfully',
        like: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

// Get all likes for a blog
exports.getLikesByBlogId = (req, res) => {
  const blogId = req.params.blogId;

  Like.find({ blogId: blogId })
    .populate('userId', 'username') // Populate the user_id field with the username from the User model
    .exec()
    .then((likes) => {
      res.status(200).json({
        count: likes.length,
        likes: likes
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

// Get all likes by a user
exports.getLikesByUserId = (req, res) => {
  const userId = req.params.userId;

  Like.find({ user_id: userId })
    .populate('post_id', 'title') // Populate the post_id field with the title from the Post model
    .exec()
    .then((likes) => {
      res.status(200).json({
        count: likes.length,
        likes: likes
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};

// Delete a like
exports.deleteLike = (req, res) => {
  const likeId = req.params.likeId;

  Like.deleteOne({ _id: likeId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: 'Like deleted successfully'
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
};
