import express, { json, urlencoded } from 'express';
import bodyParser from 'body-parser';
import DbConnect from './config/dbconnect.js' 
import routerInit from './routes/index.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
app.use(cookieParser())
app.use(cors())
const {PORT, DB_URL} = process.env || 8888

app.use(json())
app.use(bodyParser.json());

app.use(urlencoded({extended:true})) 
app.use('/api', routerInit) 
// urlencoded là đọc dữ liệu kiểu array ...
DbConnect()
app.use('/', (req,res) =>{
    res.send('run rồi')
})

app.listen(PORT, () =>{
    console.log(`chạy ` + PORT )
})