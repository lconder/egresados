var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var nodemailer = require('nodemailer');
var async = require('async');
var generateDocx = require('generate-docx');
var fs = require('fs');
var moment = require('moment');
var shortid = require('shortid');
var sha1 = require('sha1');
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

	console.log("Route para crear un nuevo negocio")
	console.log(req.body)

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
	}

	var password = shortid.generate();

	var business = {
		id: null,
		created_at: new Date(),
		name: req.body.business_name,
		password: sha1(password),
		rfc: req.body.rfc,
		phone: req.body.phone,
		facebook: req.body.facebook,
		twitter: req.body.twitter,
		website: req.body.website,
		graduated: req.body.graduated,
		discount_description: req.body.discount_description,
		size: req.body.size,
		business_type: req.body.business_type,
		categorie: req.body.categorie,
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
	}

	var attendant = {
		name: req.body.attendant_name,
		lastname: req.body.attendant_lastname,
		second_lastname: req.body.attendant_second_lastname,
		email: req.body.email,
		phone: req.body.mobile,
		address: req.body.address
	}

	addAttendant(attendant)
	.then(id_attendant =>{ 

		business.attendant_id = id_attendant
		addBusiness(business)
		.then(id_business => {

			req.session.id_business = id_business
			generateDoc(options)
			.then(doc_created => {
				
				if(doc_created.ok==1){

					Promise.all([sendEmailtoAdmin(), sendEmailToAttendant(req.body.email, password)])
					.then(values => {
						res.json({
							'error': 0,
							'description': "Negocio y encargado creados con éxito, correos enviados",
							'business': {'created': true}
						})
					})
				}
			})
			.catch(error => { res.json({'error':1, 'description':error, 'level': "created doc" }) })
		})
		.catch(error => { res.json({'error':1, 'description':error, 'level': "business"  }) })
	 })
	.catch(error => { res.json({'error':1, 'description':error, 'level': "attendant"  }) })

})


function addAttendant(attendant){


	var connection = mysql.createConnection(info_connection);

	return new Promise(function(resolve, reject){

		connection.query("INSERT INTO attendant SET ?", attendant, function(err, result){
			
			if(err){
				connection.end(function(err){console.log("connection end...")});
				reject(err)
			}else{

				if(result.affectedRows==1){
					connection.end(function(err){console.log("connection end...")});
					resolve(result.insertId)
				}else{
					connection.end(function(err){console.log("connection end...")});
					reject("Error creando encargado")
				}
			}
		})
	})
}


function addBusiness(business){


	var connection = mysql.createConnection(info_connection);

	return new Promise(function(resolve, reject){

		connection.query("INSERT INTO business SET ?", business, function(err, result){
			console.log(err, result)
			if(err){
				connection.end(function(err){console.log("connection end.")});
				reject(err)
			}else{
				if(result.affectedRows==1){
					connection.end(function(err){console.log("connection end..")});
					resolve(result.insertId)
				}else{
					connection.end(function(err){console.log("connection end...")});
					reject("Error creando negocio")
				}
			}

		})

	})
}

function generateDoc(options){

	return new Promise(function(resolve, reject){

		generateDocx(options, (error, message) => {
			if (error) {
				reject(error)
			} else {
				resolve({'ok': 1, 'message': message})
			}
		});

	})

}

function sendEmailtoAdmin(){

	return new Promise(function(resolve, reject){
		transporter.sendMail({
			from: 'conderodriguez.luis@outlook.com',
			to: 'brotherowsky@gmail.com',
			subject: 'Nuevo establecimiento registrado',
			text: 'Se ha ingresado un nuevo convenio ve a tu panel de control para poder activarlo',
			attachments: [{
				path: 'public/templates/agreement.docx'
			}]
		}, function(error, info){
			if(error){
				reject(error);
			}else{
				resolve({'ok':1, 'message': info.response});
			}
		});
	})

}

function sendEmailToAttendant(email, password){

	return new Promise(function(resolve, reject){

		transporter.sendMail({
			from: 'conderodriguez.luis@outlook.com',
			to: email,
			subject: 'Bienvenido a Egresados Ibero',
			text: "Te adjuntamos tu password: "+password+ " recuerda que tu usuario es tu R.F.C"
		}, function(error, info){
			if(error){
				reject(error)
			}else{
				resolve({'ok':1, 'message': info.response})
			}
		})
	})

}


module.exports = router;