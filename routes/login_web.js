var express = require('express');
var mysql = require('mysql');
var sha1 = require('sha1')
var request = require('request');
var router = express.Router();


//En este controller pueden iniciar sesión Administradores, Superadministradores así como los establecimientos.

router.post('/', function(req, res, next){
	var user = req.body.user;
	var password = sha1(req.body.password);
	var data = {};
	console.log(user, password)

	getAdmin(user, password)
	.then(admin => {
		console.log("admin "+admin)
		if(admin < 1){

			console.log(user, password)
			getSuperAdmin(user, password)
			.then(superadmin => {
				console.log("superadmin " + superadmin);
				if(superadmin < 1){
					getBusiness(user, password)
					.then(business => {

						console.log(business)
						req.session.level = 1; // 1 = Business
						req.session.id_business = business.id;
						data.error = 0
						data.active = business.active
						data.level = 1
						res.json(data)
					})
					.catch(error => {
						data.error = 1
						data.desc = error
						res.json(data)
					})
				}else{
					console.log("Incio de session como superadmin");
					req.session.level = 4 ;// 4 = SADMIN
					data.error = 0
					data.level = 4
					console.log(data);
					res.json(data)
				}
			})
			.catch(error => {
				data.error = 1
				data.desc = error
				res.json(data)
			})
		}else{
			req.session.level = 0 ;// 0 = ADMIN
			data.error = 0
			data.level = 0
			console.log(data);
			res.json(data)
		}
	})
	.catch(error => {
		data.error = 1
		data.desc = error
		res.json(data)
	})
	
});



function getAdmin(user, password){

	var connection = mysql.createConnection(info_connection);
	var sqlA = "SELECT count(*) as contador FROM user WHERE user=? AND password=? AND admin=?"
	return new Promise(function(resolve, reject){
		connection.query(sqlA, [user, password, 1], function(err, rows, fields){
			console.log(rows[0])
			connection.end(function(err){console.log("conexión finalizada obteniendo el admin")});
			if(err){
				return reject(err)
			}
			resolve(rows[0].contador)
		})
	})

}

function getSuperAdmin(user, password){

	var connection = mysql.createConnection(info_connection);
	var sqlA = "SELECT count(*) as contador FROM user WHERE user=? AND password=? AND superadmin=?"
	return new Promise(function(resolve, reject){
		connection.query(sqlA, [user, password, 1], function(err, rows, fields){
			console.log(rows[0])
			connection.end(function(err){console.log("conexión finalizada obteniendo el superadmin")});
			if(err){
				return reject(err)
			}
			resolve(rows[0].contador)
		})
	})

}

function getBusiness(user, password){

	var connection = mysql.createConnection(info_connection);
	var sql = "SELECT count(*) as contador, id, active FROM business WHERE rfc=? AND password=?"
	return new Promise(function(resolve, reject){
		connection.query(sql, [user, password], function(err, rows, fields){
			console.log(rows[0])
			connection.end(function(err){console.log("conexión finalizada obteniendo el negocio")});
			if(err){
				return reject(err)
			}else if(rows[0].contador == 0){
				return reject("no se ha encontrado ningún usuario")
			}
			resolve(rows[0])
		})
	})
}

module.exports = router;