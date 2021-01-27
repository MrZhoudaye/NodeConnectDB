const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

app.listen(3002,() => {
    console.log('http://localhost:3002')
})

// 连接数据库
const mysql = require('mysql')

const conn = mysql.creatConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'stu'
})

const bodyParser = require('body-parser')

app.use('/js',express.static(path.join(__dirname,'./js')))
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules')))
app.use(bodyParser.urlencoded({extended:false}))

// 获取数据
app.get('/api/getuser',(req,res) => {
    const sqlStr = 'select * from user'
    conn.query(sqlStr,(err,result) => {
        if(err) return res.json({err_code:1,message:'获取失败'})
        res.json({
            err_code:0,message:result,affectedRows:0
        })
    })
})

// 注册路由
app.get('/',(req,res) => {
    if(req.url === '/'){
        fs.readFile(path.join(__dirname,'pages.html'),(err,data) => {
            if(err) return console.log(err)
            console.log(data)
            res.end(data)
        })
    }else{
        fs.readFile('.'+req.url,(err,data) => {
            if(err) return console.log(err)
            res.end(data)
        })
    }
})