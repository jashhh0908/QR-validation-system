import express from 'express';
import { confirmCheckIn, confirmCheckOut, deleteAllParticipants, deleteOneParticipant, getParticipants, importData } from '../controller/csvController.js';
import { verifyToken } from '../controller/verifyController.js';
import { upload } from '../middleware/multer.middleware.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
const router = express.Router();

router.post('/import-data', verifyAdmin, upload.single('data'), importData);
router.get('/verify/:token', verifyAdmin, verifyToken);
router.delete('/delete', verifyAdmin, deleteAllParticipants);
router.delete('/delete/:id', verifyAdmin, deleteOneParticipant);
router.get('/read', verifyAdmin, getParticipants);
router.post('/check-in/:token', verifyAdmin, confirmCheckIn);
router.post('/check-out/:token', verifyAdmin, confirmCheckOut);
export default router;