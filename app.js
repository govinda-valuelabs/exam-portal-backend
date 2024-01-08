import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import MongoDB from './config/mongodb.js';
import router from './routes/index.js';
import fileUpload from 'express-fileupload';
import ExamModel from './model/exam.model.js';
import AttachmentModel from './model/attachment.model.js';
import { unlink, existsSync } from 'node:fs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


dotenv.config();
// Connecting database
const mongodb = new MongoDB();
mongodb.connect();

const app = express();

const corsOptions = {
    origin: '*',
}

app.use(fileUpload())
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);

app.post('/file-upload', async (req, res) => {
    const { attachment } = req.files;
    const { studentId, question } = req.body;

    if (!attachment) {
        res.sendStatus(400);
        res.send({ message: 'Invalid file' });
    }

    const timestamps = new Date().valueOf();
    const path = timestamps + '-' + attachment.name;

    try {
        const exam = await ExamModel.findOne({ studentId });
        // delete previous file;
        const find = await AttachmentModel.findOne({ exam: exam._id, question });
        if (find && existsSync(__dirname + '/public/' + find.path)) {
            unlink(__dirname + '/public/' + find.path, (error) => {
                console.log('error ', error);
                console.log('File ' + __dirname + '/public/' + find.path + ' was deleted!');
            });
        }

        // delete inserted 
        await AttachmentModel.deleteOne({ exam: exam._id, question });
        
        // upload and insert into model
        attachment.mv(__dirname + '/public/' + path);

        const result = await AttachmentModel.create({ exam: exam._id, question, path });
        res.status(201);
        res.send({ ...result, message: 'Attachment was inserted successfully' });
    } catch (error) {
        res.status(401);
        res.send({ message: 'Error in inserting attachment: ' + error.message });
    }
});

app.get('/get-attachment', async (req, res) => {
    const { questionId, studentId } = req.query;
        try {
            const exam = await ExamModel.findOne({ studentId });
            const data = await AttachmentModel.findOne({ question: questionId, exam: exam._id });
            res.status(200);
            res.json(data)
        } catch (error) {
            res.status(401);
            res.json({message: 'Error : Bad request - ' + error.message})
        }
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Exam Portal Backend!' + ' dirname : ' + dirname });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server is listening at port ' + PORT);
})