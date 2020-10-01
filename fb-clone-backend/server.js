import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import Pusher from 'pusher';

Grid.mongo = mongoose.mongo;

// App Config
const app = express();
const port = process.env.PORT || 3002

//middlewares
app.use(bodyParser.json());
app.use(cors());

// db config

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

// listen
app.listen(port, ()=>console.log(`listening on localhost: ${port}`));