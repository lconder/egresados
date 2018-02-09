var express = require('express');
var mysql = require('mysql');
var shortid = require('shortid');
var sha1 = require('sha1');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');


var transporter = nodemailer.createTransport({
	host: config.host_mail,
	port: config.port_mail,
	auth: {
			user: config.user_mail,
			pass: config.password_mail
		}
	})

router.post('/', function(req, res, next){

	console.log(req.body)
	var password = shortid.generate();

	getByRFC(req.body.rfc)
	.then( rfc_count =>{


		if(rfc_count.contador == 1)
		{	
			//enviar email con nueva contraseña
			console.log("contador igual a 1")
			savePasswordAndSendEmail(req.body.rfc, rfc_count.email, password)
			.then(info => {

				if(info.ok == 1){
					res.json({'error':0, 'updated': 1})
				}
			})
			.catch(error => { res.json({'error':1, 'description':error, 'level': "savePasswordAndSendEmail"  }) })

		}else{
			console.log("contador distinto a 1")
			res.json({'error':1, 'level': "no existe el RFC", 'code_error':1 })
		}
	})
	.catch(error => { console.log(error); res.json({'error':1, 'description':error, 'level': "busqueda de rfc"  }) })


});



function getByRFC(rfc){

	var connection = mysql.createConnection(info_connection);
	var query = 'SELECT count(email) as contador, email FROM attendant INNER JOIN business ON attendant.id = business.attendant_id WHERE business.rfc=?'
	return new Promise(function(resolve, reject){

		connection.query(query, rfc, function(err, rows, fields)
		{
			if(err){
				//console.log(err);
				connection.end(function(err){console.log("connection end...")});			
				return reject(err)
			}
			else{
				console.log(rows)
				connection.end(function(err){console.log("connection end...")});
				resolve(rows[0])
			}
	 	});
	})

}


function savePasswordAndSendEmail(rfc, email, password){

	var connection = mysql.createConnection(info_connection);
	var query = 'UPDATE business SET password=? WHERE rfc=?'
	return new Promise(function(resolve, reject){

		connection.query(query, [sha1(password), rfc], function(err, rows, fields)
		{
			if(err){
				//console.log(err);
				connection.end(function(err){console.log("connection end...")});			
				return reject(err)
			}
			else{

				connection.end(function(err){console.log("connection end...")});
				transporter.sendMail({
					from: config.user_mail,
					to: email,
					subject: 'Recuperación de contraseña',
					text: "Te adjuntamos tu nuevo password: "+password+ " recuerda que tu usuario es tu R.F.C"
				}, function(error, info){
					if(error){
						return reject(error)
					}else{
						resolve({'ok':1, 'message': info.response})
					}
				})
			}
	 	});

		


	})

}


module.exports = router;