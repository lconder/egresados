var express = require('express');
var mysql = require('mysql');
var request = require('request');
var router = express.Router();

//En este controller pueden iniciar sesión el Administrador así como los establecimientos.

router.post('/', function(req, res, next){
	console.log(req.body);
	var user = req.body.user;
	var password = req.body.password;
	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);
	if(user=="admin" && password == "admin"){
		req.session.level = 0 ;// 0 = SUPERADMIN
		res.json({"error":0, "level":0});
	}else{
		connection.query("SELECT * FROM business WHERE rfc=?", [user], function(err, rows, fields){
			if(err){
				console.log(err);
				connection.end(function(err){console.log("connection end...")});
				res.json({"err":1, "desc": err});
			}else{
				if(rows.length != 0){
					req.session.level = 1 ;// 1 = Business
					req.session.id_business = rows[0].id;			
					data["error"] = 0;
					data["level"] = 1;
					if(rows[0].active==0){
						data["active"]=0;
					}
					connection.end(function(err){console.log("connection end...")});
					res.json(data);
				}else{
					connection.end(function(err){console.log("connection end...")});
					console.log(rows);
				}
			}
		});
	}
});

module.exports = router;