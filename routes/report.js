var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/', function(req, res, next) {

	if(req.session.level!=0){
		res.render('index', { title: 'Ibero App'});
	}

	res.render('report', { title: 'Reportes', levelUser: req.session.level});
});

function getDataBusiness(init_date, finish_date, cb){
	var connection = mysql.createConnection(info_connection);
	sql = "SELECT b.*, a.email FROM business b INNER JOIN attendant a ON b.attendant_id = a.id WHERE b.created_at BETWEEN ? and ?"
	connection.query(sql,[init_date,finish_date],function(err, rows, fields){
		if(err){
			console.log(err)
			cb([]);
		}else{
			console.log(rows)
			cb(rows);
		}
	});
}

function getDataCounts(init_date, finish_date, cb){
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT s.count, p.business_type, p.graduated, p.name, d.description FROM branch b INNER JOIN branch_promotions s ON b.id = s.id_branch INNER JOIN promotions d ON d.id = s.id_promotion INNER JOIN business p ON p.id = b.business_id WHERE d.created_at BETWEEN  ? AND  ?", [init_date,finish_date],function(err, rows, fields){
		if(err){
			cb([]);
		}else{
			cb(rows);	
		}
	});
}

function getDataStudents(init_date, finish_date, cb){
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM student WHERE created_at BETWEEN ? and ?",[init_date,finish_date],function(err, rows, fields){
		if(err){
			cb([]);
		}else{
			cb(rows);	
		}
	});
}

router.post('/', function(req, res, next) {
	console.log(req.body);
	//Primero generamos las fechas en un formato entendible para NodeJS.
	var init_date = req.body.init_date.split("/");
	var finish_date = req.body.finish_date.split("/");
	var i_date = init_date[2]+'-'+init_date[1]+'-'+init_date[0];
	var f_date = finish_date[2]+'-'+finish_date[1]+'-'+finish_date[0];

	switch(req.body.search){

		case '1':
				console.log("Empresas");
				getDataBusiness(i_date, f_date, function(rows){
					res.render('graph', {title: 'Reporte de Empresas', business: rows, levelUser: req.session.level});
				});
				break;
		case '2':
				console.log("Egresados");
				getDataStudents(i_date, f_date, function(rows){
					res.render('graph1', {title: 'Reporte de Egresados', students: rows, levelUser: req.session.level});
				});
				break;
		case '3':
				console.log("Promociones");
				getDataCounts(i_date, f_date, function(rows){
					console.log(rows);
					res.render('graph2', {title: 'Reporte de Redenciones', data: rows, levelUser: req.session.level});
				});
				break;
		default:
				break;

	}

				
	
});

module.exports = router;