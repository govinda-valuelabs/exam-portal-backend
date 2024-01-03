import express from 'express';
import CategoryController from '../controller/category.controller.js';

const categoryRoute = express.Router();
const category = new CategoryController();

categoryRoute.get('/', category.getCategories);
categoryRoute.get('/:id', category.getCategory);
categoryRoute.post('/', category.create);
categoryRoute.patch('/:id', category.update);
categoryRoute.delete('/:id', category.delete);

export default categoryRoute;