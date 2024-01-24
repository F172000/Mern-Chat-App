const express=require('express');
const router=express.Router();
const {registerUser,authUser,allUsers}=require('../controllers/userController');
const {protect}=require('../middleware/authMiddleware');
// router.route('/login').get(()={}).post();
router.route('/').post(registerUser).get(protect,allUsers);
router.post('/login',authUser);
module.exports=router;
