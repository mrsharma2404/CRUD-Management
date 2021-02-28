var express = require('express')
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

/* GET home page. */

router.get("/sellerview", function (req, res, next) {
    res.render("seller.ejs",{msg:''});
  });
  
router.post("/submitrecord1", upload.any() ,function(req,res){
    //var a=req.query.cname; we use req.query for get method 
    var a=req.body.sname;
    var b=req.body.sgender;
    var c=req.body.sadd;
    var d=req.body.state;
    var e=req.body.city;
    var f=req.body.smob;
    var g=req.body.cname;
    var h=req.files[0].filename;
    var i=req.files[1].filename;
    console.log(a)
    console.log(req.body)
    console.log(req.file)
  
    pool.query("insert into seller(name,gender,address,state,city,mobile,company_name,logo,image)values(?,?,?,?,?,?,?,?,?)",[a,b,c,d,e,f,g,h,i],function(error,result)
        {
          if(error)
          {
            console.log(error)
            res.render("seller.ejs",{msg:"Fail to Submit Record"});

          }
          else
          {
            res.render("seller.ejs",{msg:"Record Submitted..."});

          }
      
      
        })
  
  });

router.get("/displayall",function(req,res,next){
  pool.query("select S.*,(Select ST.statename from state ST where ST.idstate=S.state) as statename, (Select CT.cityname from city CT where CT.idcity=S.city) as cityname from seller S", function(error, result){
                        
    if(error)
    {
      console.log(error)
      res.render("sellerview.ejs",{Data:"fail to display record"})
    }
    else
    {
      res.render("sellerview.ejs",{Data:result})
    }
  })
});

router.get("/displaybyid", function (req, res, next) {
  pool.query("select S.*,(Select ST.statename from state ST where ST.idstate=S.state) as statename, (Select CT.cityname from city CT where CT.idcity=S.city) as cityname from seller S where seller_id=?",[req.query.sid], function(error,result){
            //"select * from seller where seller_id=?"
    if(error)
    {
      console.log(error)
      res.render("sellerbyid.ejs",{Data:"fail to display record"})
    }
    else
    {
      res.render("sellerbyid.ejs",{Data:result})
    }
  })
  
});

router.get("/editdelete", function (req, res, next) {
  if (req.query.btn=="edit"){
        var a=req.query.sname;
        var b=req.query.sgender;
        var c=req.query.sadd;
        var d=req.query.state;
        var e=req.query.city;
        var f=req.query.smob;
        var g=req.query.cname;
        var h=req.query.sid1;
       
    pool.query("update seller set name=?,gender=?,address=?,state=?,city=?,mobile=?,company_name=? where seller_id=?",[a,b,c,d,e,f,g,h],function(error,result)
        {
          if(error)
          {
            console.log(error)
            res.redirect("/seller/displayall")
          }
          else
          {
            res.redirect("/seller/displayall")
          }    
        })
      }
  else if(req.query.btn=="delete"){
  pool.query("delete from seller where seller_id=?",[req.query.sid1], function(error,result){
    if(error)
    {
      console.log(error)
      res.redirect("/seller/displayall")
    }
    else
    {
      res.redirect("/seller/displayall")
    }
  })
  } 
});

router.post("/editpic1", upload.single('simage') ,function(req,res){
  var a=req.file.originalname;
  var c=req.body.ssellerid;
  pool.query("update seller set image=? where seller_id=?",[a,c], function(error,result){
    if(error)
    {
      console.log(error)
      res.redirect("/seller/displayall")
    }
    else
    {
      res.redirect("/seller/displayall")
    }
  })
  });

  router.post("/editpic2", upload.single('clogo') ,function(req,res){
    var a=req.file.originalname;
    var c=req.body.ssellerid;
    pool.query("update seller set logo=? where seller_id=?",[a,c], function(error,result){
      if(error)
      {
        console.log(error)
        res.redirect("/seller/displayall")
      }
      else
      {
        res.redirect("/seller/displayall")
      }
    })
    });
  
  

module.exports = router;