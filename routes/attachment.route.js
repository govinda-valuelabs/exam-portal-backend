import express from 'express';
import AttachmentController from '../controller/attachment.controller.js';

const attachmentRouter = express.Router();
const attachment = new AttachmentController();

attachmentRouter.get('/', attachment.getByQuestion);
attachmentRouter.get('/attachments', attachment.getAttachments);
attachmentRouter.post('/:studentId', attachment.getAttachmentsByExam);
attachmentRouter.get('/', attachment.getAttachments);

export default attachmentRouter;
