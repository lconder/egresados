var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', function(req, res, next){
	var data = {
		"error": 1,
		"students":""
	};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM student", function(err, rows, fields){
		if(!err){
			if(rows.length != 0)
			{
				data["error"]=0;
				data["students"]=rows;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				data["students"] = "No students found";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}
		}else{
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}
	});
});




router.get('/all/', function(req, res, next){

	if(req.session.level!=0){
		res.render('index', { title: 'Ibero App'});
	}

	console.log("load view to show ex-students");
	var data = {
		"error": 1,
		"students":""
	};
	
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM student", function(err, rows, fields){
    
		if(!err){
			data.students = rows
			connection.end(function(err){console.log("connection end...")});
			res.render('allStudent', {title: "Todos los alumnos", students: data.students, levelUser: req.session.level });
		}else{
			res.json(data);// page error
			connection.end(function(err){console.log("connection end...")});
		}
  });
});

module.exports = router;