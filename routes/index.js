import express from 'express';
import userController from '../controllers/userController';
import auth from '../middlewares/auth';
const router = express.Router()


router.get('/',userController.getUser)
router.post('/create',userController.Register)
router.post('/editProfile',auth,userController.editProfile)



export default router