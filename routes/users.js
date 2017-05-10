var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.get('/', function(req, res, next) {
  console.log("list all users");
  var data = {
    "error": 1,
    "users":""
  };

  connection.query("SELECT * FROM users", function(err, rows, fields){
    
    if(rows.length != 0)
    {
      data["error"] = 0;
      data["users"] = rows;
      res.json(data);
    }else{
      data["users"] = "No users found";
      res.json(data);
    }
  });
});

router.get('/:id/', function(req, res, next) {
  console.log("find an user by ID");
  var data = {"error": 1,};
  connection.query("SELECT * FROM users WHERE id = ?",[req.params.id], function(err, rows, fields){
    if(err){
      res.json({"error":1, "err":err});
    }else{
      if(rows.length != 0)
      {
        data["error"] = 0;
        data["user"] = rows;
        res.json(data);
      }else{
        data["users"] = "No user found";
        res.json(data);
      }  
    }
  });

});


module.exports = router;