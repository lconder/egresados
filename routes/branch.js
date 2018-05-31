var express = require('express');
var mysql = require('mysql');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res, next){

	var data = {"error": 1, "business": []};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT  b.logo, b.name,b.graduated, s.* FROM business b INNER JOIN branch s ON (b.id = s.business_id);", function(err, rows, fields)
	{
		var business = [];
		if(err){
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}
		else{
			if(rows.length != 0)
			{
				data["error"]=0;
				data["business"]=rows;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				data["business"] = "No business were found!";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}	
		}
 	});
});

router.get('/add', function(req, res, next){
	
	if(req.session.level!=1){
		res.render('index', { title: 'Ibero App'});
	}

	res.render('addBranch', {title: "Agregar sucursal", levelUser: req.session.level});
});

router.get('/all', function(req, res, next){

	if(req.session.level!=1){
		res.render('index', { title: 'Ibero App'});
	}

	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM branch WHERE business_id=?", [req.session.id_business],function(err, rows, fields)
	{
		var business = [];
		if(err){
			connection.end(function(err){console.log("connection end...")});
		}
		else{
			res.render('allBranch', {title: "Todas las sucursales", business: rows, levelUser: req.session.level});
		}
 	});

	
});

router.post('/', function(req, res, next){
	var data = {"error": 1};
	var branch = {
		name: req.body.name,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		address: req.body.address,
		business_id: req.session.id_business
	};
	var connection = mysql.createConnection(info_connection);

	connection.query("INSERT INTO branch SET ?", branch, function(err, result){
		if(err){
			connection.end(function(err){console.log("connection end...")});
			throw err;
		}else{
			if(result.affectedRows==1){
				data["error"]	= 0;
				data["branch"]	= {
						created: true,
						id: result.insertId
				};
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}
		}
	});
});

router.post('/address/', function(req, res, next){
	var lat = req.body.lat;
	var lng = req.body.lng;
	request('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true&key='+key_maps, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			address = JSON.parse(body); 
			res.json({"address": address.results[0].formatted_address});
		}else{
			res.json(error)
		}
	});
});

module.exports = router;