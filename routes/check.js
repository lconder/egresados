var express = require('express');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var router = express.Router();
var config = require('../config');

var transporter = nodemailer.createTransport({
	host: config.host_mail,
	port: config.port_mail,
	auth: {
			user: config.user_mail,
			pass: config.password_mail
		},
	connectionTimeout: 1 * 60 * 1000
	})

var con_chain = config.host_mail+","+config.port_mail+","+config.user_mail+","+config.password_mail+".."+config.host_database+","+config.port_database+","+config.user_database+","+config.password_database+","+config.database;

router.get('/:email', function(req, res, next){

	var connection = mysql.createConnection(info_connection);
	var data = {};

	var mailOptions = {
		from: config.user_mail,
		to: req.params.email,
		subject: 'Hello ✔', 
		text: 'Hello world ? '+con_chain,
		html: '<b>Hello world ? </b>'+con_chain
	};




	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		 	data.error_mail = error;
		 	return res.json(data);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		data.succes_mail = {
			'messageId': info.messageId,
			'response': info.response
		};
		connection.connect(function(err){

			if(!err) {
				console.log("Database is connected ...");
				data.database = 'connected'; 
				return res.json(data);   
			} else {
				console.log("Error connecting database ...");    
				data.database = 'Error database config';
			}
			res.json(data);
		});
	});
})

module.exports = router;