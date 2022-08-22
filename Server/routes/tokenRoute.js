const router = require('express').Router();
const {getTokenByUserId,transferToken} = require('../controllers/tokenController');


router.get('/token/:userId', getTokenByUserId);
router.put('/token/:userId/transfer', transferToken);


module.exports = router;