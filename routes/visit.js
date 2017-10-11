var express = require('express');
var mysql = require('mysql');
var router = express.Router();


function getVisits(id_business, cb){
	var connection = mysql.createConnection(info_connection);
	var sql = "SELECT  COUNT(bp.encrypt) as count, sp.date, b.name, b.address, b.id, p.name as name_promo FROM student_promotions sp INNER JOIN branch_promotions bp ON sp.encrypt_promotion = bp.encrypt INNER JOIN promotions p ON bp.id_promotion = p.id INNER JOIN branch b ON b.id = bp.id_branch WHERE b.business_id=? GROUP BY sp.date, bp.encrypt"
	console.log(id_business)
	connection.query(sql,[id_business],function(err, rows, fields){
		if(err){
			cb([]);
		}else{
			cb(rows);	
		}
	});
}

router.get('/', function(req, res, next) {

	if(req.session.level!=1){
		res.render('index', { title: 'Ibero App'});
	}

	getVisits(req.session.id_business,function(rows){
		console.log(rows)
		res.render('allVisits', {title: 'Visitas a mis negocios', visits: rows, levelUser: req.session.level});
	});

});


module.exports = router;