var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.post('/', function(req, res, next){

	var data = {'error': 1}
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT count(*) as contador FROM business WHERE rfc=?", [req.body.rfc],function(err, rows, fields)
	{
		var business = [];
		if(err){
			console.log(err);
			data.desc = err
			connection.end(function(err){console.log("connection end...")});			
			res.json(data)
		}
		else{
			data.error = 0
			data.count = rows[0].contador
			connection.end(function(err){console.log("connection end...")});
			res.json(data)
		}
 	});

})


module.exports = router;