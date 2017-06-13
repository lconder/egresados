var express = require('express');
var mysql = require('mysql');
var sha1 = require('sha1')
var request = require('request');
var router = express.Router();


//En este controller pueden iniciar sesión el Administrador así como los establecimientos.

router.post('/', function(req, res, next){
	var user = req.body.user;
	var password = sha1(req.body.password);
	var data = {};
	

	getAdmin(user, password)
	.then(user => {

		if(user < 1){
			getBusiness(user, password)
			.then(business => {
				
				req.session.level = 1 ;// 1 = Business
				req.session.id_business = business.id;
				data.error = 0
				data.level = 1
				console.log(data);
				res.json(data)
			})
			.catch(error => {
				data.error = 1
				data.desc = error
				res.json(data)
			})
		}else{
			req.session.level = 0 ;// 0 = SUPERADMIN
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
	var sql = "SELECT count(*) as contador FROM user WHERE user=? AND password=? AND admin=?"
	return new Promise(function(resolve, reject){
		connection.query(sql, [user, password, 1], function(err, rows, fields){
			connection.end(function(err){console.log("conexión finalizada obteniendo el admin")});
			if(err){
				return reject(err)
			}
			resolve(rows[0].contador)
		})
	})

}

function getBusiness(user, password){

	var connection = mysql.createConnection(info_connection);
	var sql = "SELECT count(*) as contador, id FROM business WHERE rfc=? AND password=?"
	return new Promise(function(resolve, reject){
		connection.query(sql, [user, password], function(err, rows, fields){
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