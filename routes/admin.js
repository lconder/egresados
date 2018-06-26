var express = require('express');
var mysql = require('mysql');
var sha1 = require('sha1');
var router = express.Router();


router.get('/', function(req, res, next){

	if(req.session.level!=4){
		res.render('index', { title: 'Ibero App'});
	}

	getAdmins()
	.then(admins => {
		res.render('allAdmin', { title: 'Todos los administradores' , admins: admins ,levelUser: req.session.level});
	})
	.catch(error => {
		res.render('index', { title: 'Ibero App'});
	})

});


router.get('/add', function(req, res, next){

	if(req.session.level!=4){
		res.render('index', { title: 'Ibero App'});
	}
	res.render('addAdmin', { title: 'Todos los administradores' , levelUser: req.session.level});

});

router.post('/', function(req, res, next){

	//console.log(req.body);
	password = req.body.password;

	let admin = {
		user : req.body.name,
		password : sha1(password),
		nickname : req.body.name,
		admin : 1,
		superadmin : 0
	};
	
	createAdmin(admin)
	.then( () => {
		res.json({
			'error': 0,
			'description': "Admin creado con éxito",
			'admin': {'created': true}
		})
			
	})
	.catch( () => {
		res.json({
			'error': 1,
			'description': "Error al crear un administrador",
			'admin': {'created': false}
		})
	})
});

router.put('/', function(req, res, next){

	deleteAdmin(req.body.id)
	.then( res.json({'error':0, 'updated': true}) )
	.catch( res.json({'error':1, 'updated': false}) )

});


function getAdmins(){

	var connection = mysql.createConnection(info_connection);
	var sql = "SELECT * FROM user WHERE admin=?";
	return new Promise(function (resolve, reject){

		connection.query(sql, 1,function(err, rows, fields){
			//console.log(rows)
			connection.end(function(err){console.log("conexión finalizada obteniendo los administradores")});
			if(err){
				return reject(err)
			}
			resolve(rows)
		})

	});
}

function deleteAdmin(id){

	var connection = mysql.createConnection(info_connection);
	sql = 'DELETE FROM user WHERE id= ?';

	return new Promise(function(resolve, reject){

		connection.query(sql, id, function(err, results, fields){
			//console.log(err, results)
			if(err){
				connection.end(function(err){console.log("connection end.")});
				return reject(err)
			}else{
				if(results.affectedRows==1){
					connection.end(function(err){console.log("connection end..")});
					resolve(results.affectedRows)
				}else{
					connection.end(function(err){console.log("connection end...")});
					return reject("Error eliminando administrador")
				}
			}
		})
	})
}


function createAdmin(admin){


	var connection = mysql.createConnection(info_connection);

	return new Promise(function(resolve, reject){

		connection.query("INSERT INTO user SET ?", admin, function(err, result){
			//console.log(err, result)
			if(err){
				connection.end(function(err){console.log("connection end.")});
				reject(err)
			}else{
				if(result.affectedRows==1){
					connection.end(function(err){console.log("connection end..")});
					resolve(result.insertId)
				}else{
					connection.end(function(err){console.log("connection end...")});
					reject("Error creando administrador")
				}
			}

		})

	})
}

module.exports = router;