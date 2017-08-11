var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');


router.post('/', function(req, res, next){
	
	phone 					= req.body.phone
	facebook 				= (req.body.facebook==undefined) ? '' : req.body.facebook
	twitter 				= (req.body.twitter==undefined) ? '' : req.body.twitter
	website 				= (req.body.website==undefined) ? '' : req.body.website
	street 					= req.body.street
	external_number 		= req.body.external_number
	postal_code 			= req.body.postal_code
	discount_description	= req.body.discount_description
	graduated				= (req.body.graduated=='on') ? 1 : 0
	id_business 			= req.session.id_business
	
	phone_attendant 		= req.body.phone_attendant
	name 					= req.body.name
	second_lastname 		= req.body.second_lastname
	lastname 				= req.body.lastname
	email 					= req.body.email
	address 				= req.body.address
	id_attendant			= req.body.id_attendant

	putBusiness 			= [phone, facebook, twitter, website, street, external_number, postal_code, discount_description, graduated, id_business]
	putAttendant 			= [name, lastname, second_lastname, phone_attendant, email, address, id_attendant]

	console.log(putBusiness)
	updateDataBusiness(putBusiness)
	.then(data_business_updated => {
		updateDataAttendant(putAttendant)
		.then(data_attendant_updated => {
			updateAct(req.files, id_business)
			.then(act_updated => {
				console.log(act_updated)
				updateVoucher(req.files, id_business)
				.then(voucher_updated => {
					console.log(voucher_updated)
					updateCredential(req.files, id_business)
					.then(credential_updated => {
						console.log(credential_updated)
						updateLogo(req.files, id_business)
						.then(logo_updated => {
							console.log(logo_updated)
							res.redirect('/business/'+id_business)
						})	
					})
				})
			})
		})
		.catch(error => {res.redirect('/business/'+id_business)})
	})
	.catch(error => {res.redirect('/business/'+id_business)})

});

function updateAct(files, id_business){

	return new Promise(function(resolve, reject){

		var dir = "files_business/";
		if(files.act!=undefined){
			name = "act_"+id_business;
			extension = files.act.originalname.split(".").pop();
			act = dir+"act_"+id_business+"."+extension;
			fs.rename(files.act.path, "public/files_business/"+name+"."+extension,  function(err){
				if(err)
					console.log(err);
				console.log("Acta constitutiva cargada...");
			});

			var connection = mysql.createConnection(info_connection);
	
			changes = [act,id_business];
			connection.query("UPDATE business SET  act = ? WHERE id = ?", changes, function(err, result){
				if(result.affectedRows==1){
					//res.render('index', { title: 'Ibero App', files: 1 });
					resolve("Se ha modificado el Acta")
				}
			})

		}else{
			resolve("No se modificó el acta")
		}

	})

}

function updateVoucher(files, id_business){

	var dir = "files_business/";
	return new Promise(function(resolve, reject){

		if(files.voucher!=undefined){
			name = "voucher_"+id_business;
			extension = files.voucher.originalname.split(".").pop();
			voucher = dir+"voucher_"+id_business+"."+extension;
			fs.rename(files.voucher.path, "public/files_business/"+name+"."+extension, function(err){
				if(err)
					console.log(err);
				console.log("Comprobante de domicilio cargado...");
			});

			var connection = mysql.createConnection(info_connection);
	
			changes = [voucher,id_business];
			connection.query("UPDATE business SET  voucher = ? WHERE id = ?", changes, function(err, result){
				if(result.affectedRows==1){
					//res.render('index', { title: 'Ibero App', files: 1 });
					resolve("Se ha modificado el Comprobante de domicilio")
				}
			})
		}else{
			resolve("No se modificó el Comprobante de domicilio")
		}


	})

}

function updateCredential(files, id_business){
	
	var dir = "files_business/";
	return new Promise(function(resolve, reject){

		if(files.credential!=undefined){
			name = "credential_"+id_business;
			extension = files.credential.originalname.split(".").pop();
			credential = dir+"credential_"+id_business+"."+extension;
			fs.rename(files.credential.path, "public/files_business/"+name+"."+extension,  function(err){
				if(err)
					console.log(err);
				console.log("ID cargado...");
			});
			var connection = mysql.createConnection(info_connection);
	
			changes = [credential,id_business];
			connection.query("UPDATE business SET  credential = ? WHERE id = ?", changes, function(err, result){
				if(result.affectedRows==1){
					//res.render('index', { title: 'Ibero App', files: 1 });
					resolve("Se ha modificado el ID oficial")
				}
			})

		}else{
			resolve("No se modificó el ID oficial")
		}

	})

}

function updateLogo(files, id_business){
	
	var dir = "files_business/";
	return new Promise(function(resolve, reject){

		if(files.logo!=undefined){
			name = "logo_"+id_business;
			extension = files.logo.originalname.split(".").pop();
			logo = dir+"logo_"+id_business+"."+extension;
			fs.rename(files.logo.path, "public/files_business/"+name+"."+extension, function(err){
				if(err)
					console.log(err);
				console.log("Logo cargado...");
			});

			var connection = mysql.createConnection(info_connection);
	
			changes = [logo,id_business];
			connection.query("UPDATE business SET  logo = ? WHERE id = ?", changes, function(err, result){
				if(result.affectedRows==1){
					//res.render('index', { title: 'Ibero App', files: 1 });
					resolve("Se ha modificado el Logo")
				}
			})
		}else{
			resolve("No se modificó el Logo")
		}

	})

}



function updateDataBusiness(business){


	return new Promise(function(resolve, reject){

		var connection = mysql.createConnection(info_connection);
		//[phone, facebook, twitter, website, street, external_number, postal_code, discount_description, graduated, id_business]
		var query = 'UPDATE business SET  phone=?, facebook=?, twitter=?, website=?, street=?, external_number=?, postal_code=?, discount_description=?, graduated=? WHERE id=?';
		connection.query(query, business, function(err, result){

			console.log(err, result)
			if(err){
				connection.end(function(err){console.log("connection end.")});
				reject(err)
			}else{
				if(result.affectedRows==1){
					connection.end(function(err){console.log("connection end..")});
					resolve(result.affectedRows)
				}else{
					connection.end(function(err){console.log("connection end...")});
					reject("Error actualizando negocio")
				}
			}
		})
	})

}

function updateDataAttendant(attendant){

	return new Promise(function(resolve, reject){

		var connection = mysql.createConnection(info_connection);
		var query = 'UPDATE attendant SET name=?, lastname=?, second_lastname=?, phone=?, email=?, address=? WHERE id=?'
		connection.query(query, attendant, function(err, result){

			console.log(err, result)
			if(err){
				connection.end(function(err){console.log("connection end.")});
				reject(err)
			}else{
				if(result.affectedRows==1){
					connection.end(function(err){console.log("connection end..")});
					resolve(result.affectedRows)
				}else{
					connection.end(function(err){console.log("connection end...")});
					reject("Error actualizando encargado")
				}
			}
		});
	})

}

module.exports = router;