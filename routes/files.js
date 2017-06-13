var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');

router.post('/', function(req, res, next){
	console.log(req.files);
	console.log(req.session.id_business);
	id_business = req.session.id_business;
	var dir = "files_business/";
	var data = {"error":1};

	name = "logo_"+id_business;
	extension = req.files.logo.originalname.split(".").pop();
	logo = dir+"logo_"+id_business+"."+extension;
	fs.rename(req.files.logo.path, "public/files_business/"+name+"."+extension, function(err){
		if(err)
			console.log(err);
		console.log("Logo cargado...");
	});

	name = "act_"+id_business;
	extension = req.files.act.originalname.split(".").pop();
	act = dir+"act_"+id_business+"."+extension;
	fs.rename(req.files.act.path, "public/files_business/"+name+"."+extension,  function(err){
		if(err)
			console.log(err);
		console.log("Acta constitutiva cargada...");
	});

	name = "voucher_"+id_business;
	extension = req.files.voucher.originalname.split(".").pop();
	voucher = dir+"voucher_"+id_business+"."+extension;
	fs.rename(req.files.voucher.path, "public/files_business/"+name+"."+extension, function(err){
		if(err)
			console.log(err);
		console.log("Comprobante de domicilio cargado...");
	});

	name = "credential_"+id_business;
	extension = req.files.credential.originalname.split(".").pop();
	credential = dir+"credential_"+id_business+"."+extension;
	fs.rename(req.files.credential.path, "public/files_business/"+name+"."+extension,  function(err){
		if(err)
			console.log(err);
		console.log("ID cargado...");
	});

	var connection = mysql.createConnection(info_connection);
	
	changes = [logo,act,credential,voucher,id_business];
	connection.query("UPDATE business SET logo = ?, act = ?, credential = ?, voucher = ? WHERE id = ?", changes, function(err, result){
		if(result.affectedRows==1){
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
			req.session.id_business = null;
			res.render('addBusiness', {title:'Agregar Establecimiento', states: states, levelUser:3});
			console.log("data updated");
		}
	});
});

router.get('/', function(req, res, next){
	console.log(req.session.id_business);
	res.render('addFiles',{title: "Carga de archivos"});
});

module.exports = router;