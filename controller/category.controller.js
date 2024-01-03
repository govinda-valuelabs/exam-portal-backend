import CategoryModel from '../model/category.model.js';

class CategoryController {
    async getCategories(req, res) {
        const categories = await CategoryModel.find();
        res.status(200);
        res.json(categories);
    }
    async getCategory(req, res) {
        const { id } = req.params;
        const data = await CategoryModel.findById(id);
        if (data) {
            res.status(200);
            res.json(data)
        }
    }
    async create(req, res) {
        try {
            const { name } = req.body;
            const question = await CategoryModel.create({ name });
            res.status(201);
            res.send({ ...question, message: 'Category was inserted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in inserting category: ' + error.message});
        }
    }
    async update(req, res) {
        try {
            const id = req.params.id
            await CategoryModel.findByIdAndUpdate(id, req.body);
            res.status(201);
            res.send({ message: 'OK', success: true});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in updating: ' + error.message});
        }
    }
    async delete(req, res) {
        try {
            const id = req.params.id;
            await CategoryModel.deleteOne({_id: id });
            res.status(201);
            res.send({ message: 'Category was deleted successfully'});
        } catch (error) {
            res.status(401);
            res.send({ message: 'Error in deleting: ' + error.message});
        }
    }
}

export default CategoryController;