import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';
import path from 'path';
import Pusher from 'pusher';
import mongoPosts from './Models/post.js';
// import my database connection url by an hidden file
import dotenv from 'dotenv';

dotenv.config();
Grid.mongo = mongoose.mongo;

// App Config
const app = express();
const port = process.env.PORT;

//middlewares
app.use(bodyParser.json());
app.use(cors());

// db config
const mongoURI = process.env.DB_CONNECT;
const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs

conn.once('open', () => {
    console.log('DB Connected')
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images');
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({storage});

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file);
});

app.post('/upload/post', (req, res) => {
    const dbPost = reqbody;
    mongoPosts.create(dbPost, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/retrieve/posts', (req, res) => {
    mongoPosts.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            data.sort((b, a) => {
                return a.timestamp - b.timestamp;
            })
            res.status(200).send(data);
        }
    })
});

app.get('/retrieve/images/single', (req, res) => {
    gfs.files.findOne({ filename: req.query.name }, (err, file) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (!file || file.length === 0) {
                res.status(404).json({ err: 'file not found' })
            } else {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            }
        }
    })
});

// listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));