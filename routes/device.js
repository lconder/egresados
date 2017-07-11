var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.post('/', function(req, res, next){
	console.log("Post Device");

	var device = {
		"token": req.body.token,
		"id_student": req.body.id_student
	};
	
	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);

	connection.query("INSERT INTO devices SET ?", device, function(err, result){
		if(err){
			data["description"] = err;
			connection.end(function(err){console.log("connection end...")});
		}else{
			data["error"] = 0;
			data["device"] = device;
			data["description"] = "device registered successfully"
			connection.end(function(err){console.log("connection end...")});
		}
		res.json(data);
	});
});


module.exports = router;