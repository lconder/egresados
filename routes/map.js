var express = require('express');
var mysql = require('mysql');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next){
	console.log("Carga la vista de un mapa");
	var data = {"error": 1, "business": []};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT  b.logo, b.name,b.graduated, s.* FROM business b INNER JOIN branch s ON (b.id = s.business_id);", function(err, rows, fields)
	{
		var business = [];
		if(err){
			console.log(err);
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}else{
			business = rows;
			connection.query("SELECT b.* , s.email as email FROM business b INNER JOIN attendant s ON ( b.attendant_id = s.id ) ", function(err, rows, fields){
				if(err){
					connection.end(function(err){console.log("connection end...")});//res.json(data);
				}else{
					connection.end(function(err){console.log("connection end...")});
					res.render('map', {title: "Mapa", businessMap: business, business:rows, levelUser: req.session.level });
					//res.render('allBusiness', {title:'Establecimientos registrados', business: rows, levelUser: req.session.level});	
				}
			});
		}
 	});
});

module.exports = router;