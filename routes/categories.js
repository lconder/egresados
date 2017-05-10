var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.get('/', function(req, res, next){
	console.log('Get categories');
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT id_categories as id, name FROM categories", function(err, rows, fields){
		if(!err){
			res.json(rows);
			connection.end(function(err){console.log("connection end...")});
		}else{
			connection.end(function(err){console.log("connection end...")});
		}
	});
});

module.exports = router;