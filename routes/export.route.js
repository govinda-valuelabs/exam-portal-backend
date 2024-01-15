import express from 'express';
import ExportController from '../controller/export.controller.js';

const exportRouter = express.Router();
const exp = new ExportController();

exportRouter.post('/', exp.export);

export default exportRouter;