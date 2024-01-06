import express from 'express';
import multer from 'multer';
import AttachmentController from '../controller/attachment.controller.js';

const upload = multer({ dest: '../uploads/' })

const attachmentRouter = express.Router();
const attachment = new AttachmentController();

attachmentRouter.get('/', attachment.getByQuestion);
attachmentRouter.post('/:studentId', attachment.getAttachmentsByExam);
attachmentRouter.get('/', attachment.getAttachments);
attachmentRouter.post('/upload', upload.single('attachment'), attachment.create);
attachmentRouter.patch('/:id', attachment.update);

export default attachmentRouter;