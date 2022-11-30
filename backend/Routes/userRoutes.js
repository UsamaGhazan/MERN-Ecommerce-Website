import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from '../Controllers/UserController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.get('/', protect, admin, getUsers);
router.post('/login', authUser); //login pr post request is leye bhej rahy hein kun k frontend sy data ayega jo store karna hoga
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
