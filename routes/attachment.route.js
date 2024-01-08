import express from 'express';
import AttachmentController from '../controller/attachment.controller.js';
import upload from '../middleware/upload.js';

const attachmentRouter = express.Router();
const attachment = new AttachmentController();

attachmentRouter.get('/', attachment.getByQuestion);
attachmentRouter.post('/:studentId', attachment.getAttachmentsByExam);
attachmentRouter.get('/', attachment.getAttachments);
attachmentRouter.post('/upload', upload.single('attachment'), attachment.create);
attachmentRouter.patch('/:id', attachment.update);

export default attachmentRouter;
