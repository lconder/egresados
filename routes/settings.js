var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', function(req, res, next){

	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT id_state as id, name FROM state;", function(err, rows, fields)
	{
		states = rows;
		connection.query("SELECT  b.*, s.name as attendant_name, s.lastname as attendant_lastname, s.second_lastname as attendant_second_lastname,s.address as address, s.email as email, s.phone as mobile FROM iqbccomm_ibero.business b INNER JOIN iqbccomm_ibero.attendant s ON (b.attendant_id = s.id) WHERE b.id = ?", req.session.id_business,function(err, rows, fields)
		{	
			res.render('settings', {title: 'Configuración', states: states, business: rows[0] });
		});
	});
});

router.post('/', function(req, res, next){

});

module.exports = router;