var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.get('/', function(req, res, next){

	getAdmins()
	.then(admins => {

		res.render('allAdmin', { title: 'Todos los administradores' , admins: admins ,levelUser: req.session.level});

	})
	.catch(error => {

	})
	

});


router.get('/add', function(req, res, next){

	res.render('addAdmin', { title: 'Todos los administradores' , levelUser: req.session.level});

});

router.post('/', function(req, res, next){

	//res.render('allAdmin', { title: 'Todos los administradores' , levelUser: req.session.level});

});

function getAdmins(){

	var connection = mysql.createConnection(info_connection);
	var sql = "SELECT * FROM user";
	return new Promise(function (resolve, reject){

		connection.query(sql,  function(err, rows, fields){
			console.log(rows)
			connection.end(function(err){console.log("conexión finalizada obteniendo los administradores")});
			if(err){
				return reject(err)
			}
			resolve(rows)
		})

	});
}

module.exports = router;