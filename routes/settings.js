var express = require('express');
var mysql = require('mysql');
var sha1 = require('sha1');
var router = express.Router();

router.get('/', function(req, res, next){

	var business_type = [{'value': "Agropecuarias"},{'value': "Mineras"},{'value': "Servicio"},{'value': "Industria"}, {'value': "Comercio"}]
	var size_business = [{'value': "Microempresa", 'name':"Pequeña (menos de 50 trabajadores)"},{'value': "Pequeña", 'name':"Microempresa (menos de 10 trabajadores)"},{'value': "Mediana", 'name':"Mediana (de 50 a 250 empleados)"},{'value': "Grande", 'name':"Grande (más de 250 empleados)"}]


	console.log(req.session.id_business);
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT id_state as id, name FROM state;", function(err, rows, fields)
	{
		states = rows
		connection.query("SELECT  b.*, s.name as attendant_name, s.lastname as attendant_lastname, s.second_lastname as attendant_second_lastname,s.address as address, s.email as email, s.phone as mobile FROM iqbccomm_ibero.business b INNER JOIN iqbccomm_ibero.attendant s ON (b.attendant_id = s.id) WHERE b.id = ?", req.session.id_business,function(err, rows, fields)
		{	
			business = rows[0]
			connection.query("SELECT  id_categories as id, name  FROM categories", req.session.id_business,function(err, rows, fields)
			{	
				categories = rows
				res.render('settings', {title: 'Configuración', states: states, categories: categories, business: business, levelUser: req.session.level, business_type: business_type, size_business: size_business });
			});
		});
	});
});

router.put('/password/', function(req, res, next){

	var password = sha1(req.body.password);
	var id_business = req.body.id_business;
	var connection = mysql.createConnection(info_connection);
	var query = 'UPDATE business SET password=? WHERE id=?'
	connection.query(query, [password, id_business], function(err, result){
		console.log(err, result);
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})

})

router.put('/', function(req, res, next){
	var data = {"error":1};
	console.log(req.body);
	var id_business = req.body.id_business;
	var id_attendant = req.body.id_attendant;
	
	name = req.body.business_name;
	rfc = req.body.rfc;
	facebook = req.body.facebook;
	twitter = req.body.twitter;
	website = req.body.website;
	graduated = req.body.graduated;
	discount_description = req.body.discount_description;
	size = req.body.size;
	business_type = req.body.business_type;
	categorie = req.body.categorie;
	street = req.body.street;
	external_number = req.body.external_number;
	internal_number = req.body.internal_number;
	postal_code = req.body.postal_code;
	suburb = req.body.suburb;
	city = req.body.city;
	state = req.body.state;
	phone = req.body.phone;

	attendant_name = req.body.attendant_name
	attendant_lastname= req.body.attendant_lastname
	attendant_second_lastname= req.body.attendant_second_lastname
	email= req.body.email
	mobile= req.body.mobile
	address= req.body.address
	id_attendant= req.body.id_attendant

	var connection = mysql.createConnection(info_connection);
	var query = 'UPDATE business SET name=?, rfc=?, facebook=?, twitter=?, website=?, graduated=?, discount_description=?, size=?, business_type=?, categorie=?, street=?, external_number=?, internal_number=?, postal_code=?, suburb=?, city=?, state=?, phone=?  WHERE id=?'
	connection.query(query, [name, rfc, facebook, twitter, website, graduated, discount_description, size, business_type, categorie, street, external_number, internal_number, postal_code, suburb, city, state, phone, id_business], function(err, result){
		console.log(err, result);
		if(err){
					connection.end(function(err){console.log("connection end...")});
					res.json(err);
				}
		else{
			if(result.affectedRows==1){
				query = 'UPDATE attendant SET name=?, lastname=?, second_lastname=?, email=?, phone=?, address=? WHERE id=?'
				connection.query(query, [attendant_name, attendant_lastname, attendant_second_lastname, email, mobile, address, id_attendant], function(err, result){
				console.log(err, result);
				if(err){
					connection.end(function(err){console.log("connection end...")});
					res.json(err);
				}
				else{
					if(result.affectedRows==1){
						data["error"]=0;
						data["updated"]=true;
						connection.end(function(err){console.log("connection end...")});
						res.json(data);
					}else{
						connection.end(function(err){console.log("connection end...")});
						res.json(data);
					}	
				}
				
			});
			}else{
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}	
		}
		
	});
});

module.exports = router;