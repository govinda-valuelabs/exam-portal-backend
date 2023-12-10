import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import MongoDB from './config/mongodb.js';
import router from './routes/index.js';

dotenv.config();
// Connecting database
const mongodb = new MongoDB();
mongodb.connect();

const app = express();

// const corsOptions = {
//     // origin: '*',
//     // credentials: true,
//     origin: ['http://localhost:5173', 'http://localhost:5174']
// }

const corsOptions = function(req, res, next){ 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 
    'Content-Type, Authorization, Content-Length, X-Requested-With');
     next();
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Exam Portal Backend!'});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server is listening at port ' + PORT);
})