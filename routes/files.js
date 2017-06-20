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
			res.render('index', { title: 'Ibero App', files: 1 });
			console.log("data updated");
		}
	});
});

router.get('/', function(req, res, next){
	console.log(req.session.id_business);
	res.render('addFiles',{title: "Carga de archivos"});
});

module.exports = router;