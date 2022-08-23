const router = require('express').Router();
const {getUserById,getPostByUserId, getNFTByUserId, getEthFaucet} = require('../controllers/userController');


router.get('/user/:userId', getUserById);
router.get('/user/:userId/post', getPostByUserId);
router.get('/user/:userId/nft', getNFTByUserId);
router.put('/user/:userId/faucet', getEthFaucet);


module.exports = router;