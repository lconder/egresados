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
	var sql = "SELECT  CONCAT(st.name, ' ', st.lastname, ' ', st.second_lastname) as name_student, bi.name, bi.graduated, bi.business_type, sp.date, bp.count, b.name as branch_name, b.address, p.name as name_promo, p.created_at, p.expired_at FROM student_promotions sp INNER JOIN branch_promotions bp ON sp.encrypt_promotion = bp.encrypt INNER JOIN promotions p ON bp.id_promotion = p.id INNER JOIN branch b ON b.id = bp.id_branch INNER JOIN business bi ON bi.id=b.business_id INNER JOIN student st ON st.id = sp.id_student";
	//WHERE d.created_at BETWEEN ? AND ?
	connection.query(sql, [init_date,finish_date],function(err, rows, fields){
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