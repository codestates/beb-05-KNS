const router = require('express').Router();
const {writePost,updatePost,deletePost,likePost,getPostById, 
       getAllPosts,writeComment,updateComment,deleteComment, getCommentByPostId,
       getUserId} = require('../controllers/postController');


router.post('/post', writePost);
router.get('/post', getAllPosts);
router.put('/post/:postId', updatePost);
router.delete('/post/:postId', deletePost);
router.get('/post/:postId', getPostById);
router.put('/post/like/:postId', likePost);
router.post('/post/:postId/comment', writeComment);
router.get('/post/:postId/comment', getCommentByPostId);
router.put('/post/comment/:commentId', updateComment);
router.delete('/post/comment/:commentId', deleteComment);
router.get('/userId', getUserId);

module.exports = router;