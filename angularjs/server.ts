import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/seanwasere', { useNewUrlParser: true });

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'www')));

import catsRouter from './routes/cats';
app.use('/api', catsRouter);

app.listen(port);

console.log('nodejs server started : \nhttp://127.0.0.1:' + port);

