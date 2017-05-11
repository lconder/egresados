var express = require('express');
var mysql = require('mysql');
var async = require('async');
var router = express.Router();


router.get('/:id', function(req, res, next){
	var data = {"error": 1, "promotion":""};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT b.name AS branch, b.address AS branch_address, b.latitude, b.longitude,s.count, s.active, p.name AS promo, p.description FROM branch b INNER JOIN branch_promotions s ON b.id = s.id_branch INNER JOIN promotions p ON p.id = s.id_promotion WHERE s.encrypt=? and s.active=?", [req.params.id,1], function(err, rows, fields){
		if(err){
			res.json({"err":1, "desc": err});
		}else{
			if(rows.length != 0)
			{
				data["error"] = 0;
				data["promotion"] = rows[0];
				res.json(data);
			}
		}
	});
});

router.post('/:id', function(req, res, next){
	console.log(req.body);

	var data = {"error": 1, "promotion":""};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT count FROM branch_promotions WHERE encrypt=?", [req.params.id], function(err, rows, fields){
		if(err){
			res.json({"err":1, "desc": err});
		}else{
			if(rows.length != 0)
			{
				var count=rows[0].count;
				count += 1;
				connection.query("UPDATE branch_promotions SET count = ? WHERE encrypt = ?", [count,req.params.id], function(err, result){
					if(err){
						res.json({"err":1, "desc": err});
					}
					else{
						if(result.affectedRows==1){
							connection.end(function(err){console.log("connection end...")});
							data["error"] = 0;
							data["promotion"] = {modified: true}; 
							postDataUserPromo(req.body.student, req.params.id, function(result){
								console.log(result);
								res.json(data);
							});
							
						}
					}
				});
			}
		}
	});
});

function postDataUserPromo(student, promotion, cb){
	var connection = mysql.createConnection(info_connection);
	var insert = {
		id_student: student,
		encrypt_promotion: promotion,
		date: new Date()
	}
	connection.query("INSERT INTO student_promotions SET ?",insert,function(err, result){
		if(err){
			cb([]);
		}else{
			cb(result);	
		}
	});
}

router.get('/edit/:id/', function(req, res, next){
	var connection = mysql.createConnection(info_connection);
	
	connection.query("SELECT * FROM promotions WHERE id=?", [req.params.id], function(err, rows, fields){
		if(err){
			console.log(err);
		}else{
			b = rows[0];
			res.render('promotion', {title: 'Promoción', b: b, levelUser: req.session.level});
		}
	});
});


module.exports = router;