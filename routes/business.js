var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var nodemailer = require('nodemailer');
var async = require('async');
var generateDocx = require('generate-docx');
var fs = require('fs');
var moment = require('moment');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'brotherowsky@gmail.com',
		pass: 'novidosN0!'
		}
	})

//----------------------------API-------------------------------------------------
router.get('/', function(req, res, next) {
	console.log("Get All Business")
	var data = {
		"error": 1,
		"business":""
	};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM business", function(err, rows, fields){
		if(err)
			res.json(data);
		else{
			if(rows.length != 0)
			{
				data["error"] = 0;
				business = rows;
				
				var c=0;
				async.each(business, function(item, cb){
					connection.query("SELECT * FROM branch WHERE business_id=?",[item.id], function(err, rows, fields){
						if(err)
							console.log(err);
						console.log(rows);
						business[c].branch = rows;
						c++;	
						cb();
					});
					
					
				}, function(err){
					if(err)
						console.log(err);
					connection.end(function(err){console.log("connection end...")});
					data["business"] = business;
					res.json(data);
				});
				
			}else{
				data["business"] = "No business was found!";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}	
		}
	});
});



//----------------------------API-------------------------------------------------

router.get('/all/', function(req, res, next) {
	console.log("Get All Business and render view");
	var data = {
		"error": 1,
		"business":""
	};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT b.* , s.email as email FROM business b INNER JOIN attendant s ON ( b.attendant_id = s.id ) ", function(err, rows, fields){
    if(err)
    {	
    	connection.end(function(err){console.log("connection end...")});
    	//res.json(data);
    }
    else{
    	connection.end(function(err){console.log("connection end...")});
    	res.render('allBusiness', {title:'Establecimientos registrados', business: rows, levelUser: req.session.level});	
    }
    
  });
});

router.get('/add/', function(req, res, next) {
	console.log("Render view to add a new business");
	var states = [
			{id: 1, name: "Aguascalientes"},
			{id: 2, name: "Baja California"},
			{id: 3, name: "Baja California Sur"},
			{id: 4, name: "Campeche"},
			{id: 5, name: "Chiapas"},
			{id: 6, name: "Chihuahua"},
			{id: 7, name: "Coahuila"},
			{id: 8, name: "Colima"},
			{id: 9, name: "Ciudad de México"},
			{id: 10, name: "Durango"},
			{id: 11, name: "Guanajuato"},
			{id: 12, name: "Guerrero"},
			{id: 13, name: "Hidalgo"},
			{id: 14, name: "Jalisco"},
			{id: 15, name: "México"},
			{id: 16, name: "Michoacan"},
			{id: 17, name: "Morelos"},
			{id: 18, name: "Nayarit"},
			{id: 19, name: "Nuevo León"},
			{id: 20, name: "Oaxaca"},
			{id: 21, name: "Puebla"},
			{id: 22, name: "Queretaro"},
			{id: 23, name: "Quintana Roo"},
			{id: 24, name: "San Luis Potosi"},
			{id: 25, name: "Sinaloa"},
			{id: 26, name: "Sonora"},
			{id: 27, name: "Tabasco"},
			{id: 28, name: "Tamaulipas"},
			{id: 29, name: "Tlaxcala"},
			{id: 30, name: "Veracruz"},
			{id: 31, name: "Yucatán"},
			{id: 32, name: "Zacatecas"}];
	res.render('addBusiness', {title:'Agregar Establecimiento', states: states});
});

router.post('/', function(req, res, next){
	console.log("Create a new Business");
	var data = {
		"error":1,
		"business": ""
	};

	var options = {
		template: {
			filePath: 'public/templates/convenio.docx',
			data: {
				'business_name': req.body.business_name,
				'attendant_name': req.body.attendant_name+' '+req.body.attendant_lastname+' '+req.body.attendant_second_lastname,
				'address': req.body.address,
				'attendant_email': req.body.email,
				'rfc': req.body.rfc,
				'date': moment(new Date()).format("DD/MM/YYYY"),
				'day': new Date().getDate(),
				'month': new Date().getMonth()+1
			}
		},
		save: {
			filePath: 'public/templates/agreement.docx'
		}
	};

	console.log(req.body);
	var business = {
		id: null,
		created_at: new Date(),
		name: req.body.business_name,
		rfc: req.body.rfc,
		phone: req.body.phone,
		facebook: req.body.facebook,
		twitter: req.body.twitter,
		website: req.body.website,
		graduated: req.body.graduated,
		discount_description: req.body.discount_description,
		size: req.body.size,
		business_type: req.body.business_type,
		logo: "",
		act: "",
		credential: "",
		voucher: "",
		street: req.body.street,
		external_number: req.body.external_number,
		internal_number: req.body.internal_number,
		postal_code: req.body.postal_code,
		suburb: req.body.suburb,
		city: req.body.city,
		state: req.body.state,
		active: false,
		user_id: 1
	};

	var attendant = {
		name: req.body.attendant_name,
		lastname: req.body.attendant_lastname,
		second_lastname: req.body.attendant_second_lastname,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address
	};
	var connection = mysql.createConnection(info_connection);
	connection.query("INSERT INTO attendant SET ?", attendant, function(err, result){
		if(err){
			console.log("Error on attendant creation");
			console.log(err);
			data["error"] = 1;
			data["business"]=err;
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}else{
			if(result.affectedRows==1){
				business["attendant_id"]= result.insertId;
				data["error"]=0;
				data["business"] = {
					created: true
				};
				connection.query("INSERT INTO business SET ?", business, function(err, result){
					console.log(business);
					if(err){
						console.log("Error on business creation...");
						console.log(err);
						data["error"] = 1;
						data["business"]=err;
						connection.end(function(err){console.log("connection end...")});
						res.json(data);
					}else{
						if(result.affectedRows==1){
							req.session.id_business = result.insertId;
							data["error"]=0;
							data["business"] = {
								created: true
							};

							generateDocx(options, (error, message) => {
								if (error) {
									console.error(error);
								} else {
									console.log(message);
								}
							});

							transporter.sendMail({
								from: 'conderodriguez.luis@outlook.com',
								to: 'egresados@iberopuebla.mx',
								subject: 'Nuevo establecimiento registrado',
								text: "Se ha ingresado un nuevo convenio ve a tu panel de control para poder activarlo",
								attachments: [{
									path: 'public/templates/agreement.docx'
								}]
							}, function(error, info){
								if(error){
									console.log(error);
								}else{
									console.log('Message sent: ' + info.response);
								}
							});
							connection.end(function(err){console.log("connection end...")});
							res.json(data);		
						}
					}
				});		
			}
		}
	});
});

router.post('/activate/', function(req, res, next){
	var data = {"error":1};
	var id = req.body.id;
	var status = req.body.status;
	var connection = mysql.createConnection(info_connection);
	connection.query("UPDATE business SET active = ? WHERE id = ?", [status,id], function(err, result){
		if(result.affectedRows==1){
			data["error"]=0;
			data["updated"]=true;
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}
	});
});

router.get('/:id/', function(req, res, next){
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT  b.*, s.name AS name_attendant, s.phone AS phone_attendant, s.lastname, s.second_lastname, s.email, s.address FROM business b INNER JOIN attendant s ON (b.attendant_id = s.id) WHERE b.id=?;", [req.params.id],function(err, rows, fields)
	{
		if(err){
			console.log(err);
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}
		else{
			console.log(rows[0]);
			connection.end(function(err){console.log("connection end...")});
			res.render('business', {title: "Vista de negocio", b:rows[0],  levelUser: req.session.level});	
		}
 	});
});



module.exports = router;
