var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log("list all agreements");
	var data = {"error": 1, "agreements":""};
	var connection = mysql.createConnection(info_connection);

	connection.query("SELECT * FROM business", function(err, rows, fields){
		if(err){
			connection.end(function(err){console.log("connection end...")});
			res.json({"err":1, "desc": err});
		}else{
			if(rows.length != 0)
			{
				data["error"] = 0;
				data["agreements"] = rows;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				data["agreements"] = "No agreements found";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}
		}
	});
});

router.get('/all', function(req, res, next) {
	console.log("list all agreements");
	var data = {"error": 1, "agreements":""};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM business", function(err, rows, fields){
		if(err){
			res.json({"err":1, "desc": err});
		}else{
			if(rows.length != 0)
			{
				data["error"] = 0;
				data["agreements"] = rows;
				connection.end(function(err){console.log("connection end...")});
				res.render('allAgreement',{title:'Todos los convenios', data: data, levelUser: req.session.level});
			}
		}
	});
});

router.get('/add', function(req, res, next) {
	console.log("list all agreements");
	var data = {"error": 1, "agreements":""};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM agreement", function(err, rows, fields){
		if(err){
			connection.end(function(err){console.log("connection end...")});
			res.json({"err":1, "desc": err});
		}else{
			if(rows.length != 0)
			{
				data["error"] = 0;
				data["agreements"] = rows;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				data["agreements"] = "No agreements found";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}
		}
	});
});


module.exports = router;