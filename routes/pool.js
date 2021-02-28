var mysql=require("mysql")

var pool=mysql.createPool(
    { 
    host:'localhost',
    port:3307,
    user:'root',
    password:'mysql',
    database:'product',
    connectionLimit:100,
    multipleStatements:true
    })

    module.exports=pool