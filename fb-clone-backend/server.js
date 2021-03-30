// import
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import multer from "multer"
import GridFsStorage from "multer-gridfs-storage"
import Grid from "gridfs-stream"
import bodyParser from "body-parser"
import path from "path"
import Pusher from "pusher"
import mongoPosts from "./mongoPosts.js"

Grid.mongo = mongoose.mongo


// app config
const app = express()
const PORT = process.env.PORT

// middlewares
app.use(bodyParser.json());
app.use(cors());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//db config
const mongoURI = process.env.mongoURI;

const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB connected')
    
    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => {
        console.log(change)

        if (change.operationType === 'insert') {
            console.log('Triggering Pusher')

            pusher.trigger('posts', 'inserted', {
                change: change
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})

let gfs

conn.once('open', ()=> {
    console.log('DB Connect')
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('images')
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {{
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`

            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            }
            resolve(fileInfo)
        }})
    }
})

const upload = multer({ storage })


const pusher = new Pusher({
    appId: "1165109",
    key: "8d98de18867102299b91",
    secret: "ef6aa250c8fed2600ba8",
    cluster: "eu",
    useTLS: true
  });

  
//api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/upload/image", upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

app.post("/upload/post", (req, res) => {
    const dbPost = req.body

    mongoPosts.create(dbPost, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/retrieve/image/single", (req, res) => {
    gfs.files.findOne({ filename: req.query.name }, (err, file) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if(!file || file.length === 0) {
                res.status(404).json({err: "file not found"})
            } else {
                const readstream = gfs.createReadStream(file.filename);
                readstream.pipe(res);
            }
        }
    })
})

app.get("/retrieve/posts", (req, res) =>{
    mongoPosts.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            data.sort((b, a) => {
                return a.timestamp - b.timestamp;
            })

            res.status(200).send(data)
        }
    })
})

//listen
app.listen(PORT, () => console.log(`listening on localhost:${PORT}`));