const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs_mysql'
})

connection.connect((error)=>{
    if(error){
        console.log(error)
        return;
    }
    console.log('connected with database');

})

app.get('/get-list',(req,res)=>{
    const sql = 'select * from books';
    connection.query(sql,(error,result)=>{
        if(error){
            res.send({
                status:500,
                data:error
            })
        }
        res.send({
            status:200,
            data:result
        })
    })
})


app.get('/get-list/:id',(req,res)=>{
    const {id} = req.params;
    const sql = `select * from books where id = ${id}`;
    connection.query(sql,(error,result)=>{
        if(error){
            res.send({
                status:500,
                data:error
            })
        }
        res.send({
            status:200,
            data:result
        })
    })
})

app.post('/add-book',(req,res)=>{
    const {name,author} = req.body;
    
    const addData = {
        name,
        author
    }
    const sql = 'INSERT INTO books set ?';
    connection.query(sql,addData,(error,result)=>{
        if(error){
            result.send({
                status:500,
                data:error
            })
        }
        res.send({
            status:200,
            data:result
        })
    })
})

app.put('/update-book/:id',(req,res)=>{
    const id = req.params.id;
    const {name,author} = req.body;
    const updateData = {
        name,
        author
    }

    const sql = `update books set ? where id = ${id}`;
    connection.query(sql,updateData,(error,result)=>{
        if(error){
            res.send({
                status:500,
                data:error
            })
        }
        res.send({
            status:200,
            data:result
        })
    })
})

app.listen(port,()=>{
    console.log(`Server is running in port: ${port}`);
})