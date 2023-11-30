const express = require('express');
require('dotenv').config();

const app = express();
const {PORT} = process.env || 8888

app.use(express.json())
app.use(express.urlencoded({extended:true}))  
// urlencoded là đọc dữ liệu kiểu array ...

app.use('/', (req,res) =>{
    res.send('run rồi')
})

app.listen(PORT, () =>{
    console.log(`chạy ` + PORT )
})