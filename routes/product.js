var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer');
var LocalStorage = require('node-localstorage').LocalStorage
LocalStorage = new LocalStorage('./scratch')

/* GET home page. */

router.get("/productview", function (req, res, next) {
    if(LocalStorage.getItem('Admin'))
      res.render("product",{msg:''});
    else
      res.render("login.ejs" , {msg: " "})
  });
  
router.post("/submitrecord", upload.single('pimage') ,function(req,res){
    //var a=req.query.cname; we use req.query for get method 
    var a=req.body.cname;
    var b=req.body.pname;
    var c=req.body.crate;
    var d=req.body.poffer;
    var e=req.body.pstock;
    var f=req.body.pdes;
    var g=req.body.pstatus;
    var h=req.file.filename;
    console.log(a)
    console.log(req.body)
    console.log(req.file)
  
    pool.query("insert into product1(company_name,product_name,MRP,offer_price,stock,description,status,image)values(?,?,?,?,?,?,?,?)",[a,b,c,d,e,f,g,h],function(error,result)
        {
          if(error)
          {
            console.log(error)
            res.render("product.ejs",{msg:"Fail to Submit Record"});
          }
          else
          {
             res.render("product.ejs",{msg:"Record Submitted..."});
          }    
        }) //here we did a close simple bracket beacuse this if else is also a part or your query 
  });

router.get("/displayall", function (req, res, next) {
  pool.query("select * from product1", function(error,result){
    if(error)
    {
      console.log(error)
      res.render("productview.ejs",{Data:"fail to display record"})
    }
    else
    {
      res.render("productview.ejs",{Data:result})
    }
  })
  
});

router.get("/displaybyid", function (req, res, next) {
  pool.query("select * from product1 where product_id=?",[req.query.pid], function(error,result){
    if(error)
    {
      console.log(error)
      res.render("productbyid.ejs",{Data:"fail to display record"})
    }
    else
    {
      res.render("productbyid.ejs",{Data:result})
    }
  })
  
});

router.get("/editdelete", function (req, res, next) {
  if (req.query.btn=="edit"){
        var a=req.query.cname;
        var b=req.query.pname;
        var c=req.query.crate;
        var d=req.query.poffer;
        var e=req.query.pstock;
        var f=req.query.pdes;
        var g=req.query.pstatus;
        var h=req.query.pid1;
        console.log(a)
        console.log(req.body)
        console.log(req.file)
  
    pool.query("update product1 set company_name=?,product_name=?,MRP=?,offer_price=?,stock=?,description=?,status=? where product_id=?",[a,b,c,d,e,f,g,h],function(error,result)
        {
          if(error)
          {
            console.log(error)
            res.redirect("/product/displayall")
          }
          else
          {
            res.redirect("/product/displayall")
          }    
        })
      }
  else if(req.query.btn=="delete"){
  pool.query("delete from product1 where product_id=?",[req.query.pid1], function(error,result){
    if(error)
    {
      console.log(error)
      res.redirect("/product/displayall")
    }
    else
    {
      res.redirect("/product/displayall")
    }
  })
  } 
});

router.post("/editpic", upload.single('pimage') ,function(req,res){
  pool.query("update product1 set image=? where product_id=?",[req.file.originalname, req.body.pproductid], function(error,result){
    if(error)
    {
      console.log(error)
      res.redirect("/product/displayall")
    }
    else
    {
      res.redirect("/product/displayall")
    }
  })
  } );


module.exports = router;