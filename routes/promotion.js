var express = require('express');
var mysql = require('mysql');
var moment = require('moment');
var query = require('../utils/queries');
var error = require('../utils/error');
var objects = require('../utils/objects');
var router = express.Router();


router.get('/:id', function(req, res, next){

	var data = {"error": 1, "promotion":""};
	var today = moment().format("YYYY-MM-DD");
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT b.name AS branch, b.address AS branch_address, b.latitude, b.longitude,s.count, s.active, p.name AS promo, p.description FROM branch b INNER JOIN branch_promotions s ON b.id = s.id_branch INNER JOIN promotions p ON p.id = s.id_promotion WHERE s.encrypt=? and s.active=? AND ? BETWEEN p.created_at AND p.expired_at", [req.params.id,1, today], function(err, rows, fields){
		if(err){
			res.json({"err":1, "desc": err});
		}else{
			if(rows.length != 0)
			{
				data.error = 0;
				data.promotion = rows[0];
			}else{
				data.error = 1;
				data.description = "No promotions found";
			}
		}
		res.json(data);
	});
});

router.post('/:id', function(req, res, next){

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

router.put('/activate/', function(req, res, next){
	var data = {"error":1};
	console.log(req.body);
	var id = req.body.id;
	var status = req.body.status;
	var connection = mysql.createConnection(info_connection);
	connection.query("UPDATE branch_promotions SET active = ? WHERE encrypt = ?", [status,id], function(err, result){
		console.log(err, result);
		if(err)
			res.json(err);
		else{
			if(result.affectedRows==1){
				data["error"]=0;
				data["updated"]=true;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				res.json(data);
			}	
		}
		
	});
});

router.get('/edit/:id', function(req, res, next) {

	let id = req.params.id

	getPromoInfo(id)
	.then(info_promo => {
		id_business = info_promo[0].business_id;
		getBranchs(id_business)
		.then(branchs => {
			console.log( objects.editPromo(info_promo, branchs) )
			let promotion = objects.editPromo(info_promo, branchs)
			res.render('promotion', {title: 'Promoción', promotion: promotion, business: promotion.branchs, levelUser: req.session.level});
		})
		.catch(err => {
			console.error(err)
		})
	})
	.catch(err => {
		console.error(err)
	})
});


function getPromoInfo(id_promo) {

	return new Promise(function(resolve, reject){

		let connection = mysql.createConnection(info_connection);
		connection.query(query.query_get_promo_info_full, [id_promo], (err, rows, fields) => {

			if(err){
				reject(err)
			}else{
				resolve(rows)
			}
		})
	})

}

function getBranchs(id_business) {

	return new Promise(function(resolve, reject){
		let connection = mysql.createConnection(info_connection);
		connection.query(query.query_get_branchs_by_id, [id_business], (err, rows, fields) => {

			if(err){
				reject(err)
			}else{
				resolve(rows)
			}
		})
	})
}


module.exports = router;