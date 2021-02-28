var express = require('express')
var router = express.Router();
var pool = require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage
LocalStorage = new LocalStorage('./scratch')
var pc
var sc
router.get('/login',function(req, res, next){
    res.render("login.ejs" , {msg: " "})
});

router.get('/menu', function (req, res, next){
      pool.query("select count(*) as c from product1 ", function(error,result){
        if(error)
        {
          pc = 0;
          console.log(error)
        }
        else
        {
          pc = result;
          console.log(pc)
          
        }
      })
      pool.query("select count(*) as s from seller ", function(error,result){
        if(error)
        {
          sc = 0;
          console.log(error)
        }
        else
        {
          sc = result;
          console.log(sc)
          
        }
      })

    pool.query("select * from adminlogin where adminname=? and adminpassword=?", [req.query.name, req.query.password],function (error, result) {
        if(error)
        {
          console.log(error);
          res.render("login.ejs", {msg: "Server Error" });
        } 
        else 
        {
          if(result.length == 0)
            {
                res.render("login.ejs", {msg: "Invalid UserId/Password" });
            }
            else
            {   
                LocalStorage.setItem('Admin',result);
                res.render("menu.ejs" ,{'pc':pc, 'sc':sc});
                
            }
        }
      }
    );
  });

module.exports = router;