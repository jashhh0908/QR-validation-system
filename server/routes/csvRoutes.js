import express from 'express';
import { confirmCheckIn, confirmCheckOut, deleteAllParticipants, deleteOneParticipant, getParticipants, importData } from '../controller/csvController.js';
import { verifyToken } from '../controller/verifyController.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/import-data', upload.single('data'), importData);
router.get('/verify/:token', verifyToken);
router.delete('/delete', deleteAllParticipants);
router.delete('/delete/:id', deleteOneParticipant);
router.get('/read', getParticipants);
router.post('/check-in/:token', confirmCheckIn);
router.post('/check-out/:token', confirmCheckOut);
export default router;