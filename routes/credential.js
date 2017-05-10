var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.get('/:mat', function(req, res, next){
	console.log("credential by Id");
	var connection = mysql.createConnection(info_connection);
	var data = {"error": 1};
	connection.query("SELECT name, lastname, second_lastname, mat, photo, career  from student WHERE id=?",[req.params.mat], function(err, rows, fields)
	{
		
		if(err){
			throw err;
			connection.end(function(err){console.log("connection end...")});
		}
		else{
			if(rows.length != 0)
			{
				data["error"]=0;
				data["student"]=rows;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				data["student"] = "No students were found!";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}
		}

 	});
});


router.put('/', function(req, res, next){
	console.log("Edición de datos de un alumno");
	console.log(req.body);

	var data = {"error": 1};

	data["error"] = 0;
	data["modified"] = true;

	res.json(data);	

});

module.exports = router;