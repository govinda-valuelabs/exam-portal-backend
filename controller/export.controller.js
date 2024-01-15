import QuestionModel from '../model/question.model.js';
import StudentModel from '../model/student.model.js';
import CategoryModel from '../model/category.model.js';
import UserModel from '../model/user.model.js';
import ExcelService from '../service/excel.service.js'
import PDFExporter from '../service/pdf.service.js';

class ExportController {
    async export(req, res) {
        const { model, type } = req.body
        let items = [];
        let headers = [];
        let title = '';
        let filename = '';
        switch (model) {
            case 'question':
                filename = 'List-of-question'
                headers = [
                    { header: "Title", key: "title", width: 50, font: { bold: true } },
                    { header: "Category", key: "category", width: 20, font: { bold: true } },
                    { header: "Type", key: "type", width: 10, font: { bold: true } },
                    { header: "Attachment", key: "attachment", width: 10, font: { bold: true } },
                    { header: 'Options', key: 'options', font: { bold: true } }
                ]
                const questions = await QuestionModel.find().populate('category').populate('options');
                questions.forEach((q) => {
                    let options = '';

                    if (q.options) {
                        q.options.forEach((o) => {
                            options += o.value + ', '
                        })
                    }
                    if (options) {
                        options = options.slice(0, -2);
                    }

                    items.push({
                        title: q.title,
                        category: q.category.name,
                        type: q.type,
                        attachment: q.attachment,
                        options
                    })
                });
                break;
            case 'admin':
                filename = 'List-of-admin'
                const users = await UserModel.find();
                headers = [
                    { header: "Name", key: "name", width: 30 },
                    { header: "Email", key: "email", width: 20 }
                ]

                users.forEach((u) => {
                    items.push({
                        name: users.name,
                        email: users.email
                    })
                });
                break;
            case 'user':
                filename = 'List-of-user'
                const students = await StudentModel.find();
                headers = [
                    { header: "Name", key: "name", width: 30 },
                    { header: "Email", key: "email", width: 20 }
                ]

                students.forEach((s) => {
                    items.push({
                        name: s.name,
                        email: s.email
                    })
                });
                break;
            case 'category':
                filename = 'List-of-category'
                const categories = await CategoryModel.find();
                headers = [
                    { header: "Name", key: "name", width: 30 },
                    { header: "Description", key: "description", width: 20 }
                ]

                categories.forEach((c) => {
                    items.push({
                        name: c.name,
                        description: c.description
                    })
                });
                break;
        }
        if (items.length) {
            try {
                if (type == 'excel') {
                    const excelExporter = new ExcelService();
                    filename = filename + '-' + new Date().valueOf() + '.xlsx';
                    await excelExporter.exportToExcel(items, filename, 'Sheet 1', headers);
                } else if (type == 'pdf') {
                    filename = filename + '-' + new Date().valueOf() + '.pdf';
                    const headerArray = [];
                    const data = [];
                    
                    headers.forEach((h) => {
                        headerArray.push(h.header);
                    });

                    items.forEach((i) => {
                        const arr = {Title: i.title, Category: i.category, Type: i.type, Attachment: String(i.attachment), Options: i.options };
                        data.push(arr);
                    })
                    
                    const pdfExporter = new PDFExporter(data, filename, 'List of ' + model, headerArray);
                    pdfExporter.exportToPdf();
                }

                res.status(200);
                res.send({ path: 'http://localhost:8080/export/' + filename })
            } catch (error) {
                console.log('error ', error);
                res.status(200);
                res.send({ message: 'No data to export' });
            }
        } else {
            res.status(401);
            res.send({ message: 'No data to export' });
        }
    }
}

export default ExportController;