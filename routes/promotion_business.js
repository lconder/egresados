var express = require('express');
var mysql = require('mysql');
var sha1 = require('sha1')
var moment = require('moment')
var async = require('async')
var shortid = require('shortid');
var FCM = require('fcm-push');
var serverKey = 'AAAAjAIzTrQ:APA91bEgPm6HXYsWgLtqABO86u897OMc-kjDNxaJ1VkNOfhxGlNNrsDmNoxVkGAEHIJOp9luoYwKvmVSpPw18c1CA3grPjklZRzALLDSELTK8qaDUxwNbUBVNx1UD36QnsGaQMv_qRQ5';
var fcm = new FCM(serverKey);
var router = express.Router();

router.post('/', function(req, res, next){
	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);

	sendPush(req.body.name, req.body.promo_description);

	if(req.session.id_business != null)
	{
		var date_expired = req.body.expired_date.split("/");
		var date_created = req.body.created_at.split("/");
		var promo = {
			"name": req.body.name,
			"description": req.body.promo_description,
			"count": 0,
			"expired_at": new Date(date_expired[2],date_expired[1]-1,date_expired[0]),
			"created_at": new Date(date_created[2],date_created[1]-1,date_created[0]),
			"business_id": req.session.id_business
		};
		connection.query("INSERT INTO promotions SET ?", promo, function(err, result){
			if(err){
				console.log("Error on promo creation...");
				console.log(err);
				data["error"] = 1;
				data["promo"]=err;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				if(result.affectedRows==1){
					var id = result.insertId;
					//var encrypt = sha1(id);
					var branchs = req.body.branch;
					var c=0;
					async.each(branchs, function(item, cb){
						insert = {
							id_branch: item,
							id_promotion: id,
							count: 0,
							encrypt: shortid.generate(),
							active: 1
						};
						console.log(insert);
						connection.query("INSERT INTO branch_promotions SET ?",insert, function(err, result){
							if(err)
								console.log(err);
							c++
							cb();
						});
					}, function(err){
						if(err)
							console.log(err);
						data["error"]=0;
						data["promo"] = {
							created: true
						};
						connection.end(function(err){console.log("connection end...")});
						res.json(data);
					});


					
				}
			}
		});	
	}else{
		console.log("Manage error...");
	}
})


router.get('/add', function(req, res, next){
	var connection = mysql.createConnection(info_connection);
	if(req.session.id_business != null){
		connection.query("SELECT * FROM branch WHERE business_id=?", [req.session.id_business],function(err, rows, fields)
		{
			res.render('addPromotion', {title: 'Agregar Promoción', business: rows, levelUser: req.session.level});
		});
	}else{
		console.log("Manage error");
	}
})


router.get('/all', function(req, res, next){
	var data = {
		"error": 1,
		"promos":""
	};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT b.name as name_branch, b.address, s. * , p.name, p.description FROM branch b INNER JOIN branch_promotions s ON b.id = s.id_branch INNER JOIN promotions p ON p.id = s.id_promotion WHERE b.business_id=?", [req.session.id_business],function(err, rows, fields){
    
		if(!err){
			if(rows.length != 0)
			{
				data["error"]=0;
				data["promos"]=rows;
				connection.end(function(err){console.log("connection end...")});
				res.render('allPromotions', {title: 'Todas mis promociones', levelUser: req.session.level, data: data});
			}else{
				connection.end(function(err){console.log("connection end...")});
				data["promos"] = "No promos found";
			}
		}else{
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}
	});
})


function sendPush(title, body){
	var message = {
	    to: 'c4fLqGRc8PU:APA91bGrokQdAcKnHBd3r67i6c6g0OXh9xFnG-qGvw5iKEvnIUwEl-o9b3fZYErMI7wAwy4erHVOxKtpsEdr1bpfg8hOY3VQYEeK_vFXHcfm7NIekH0EUM1PqBKfX7JMLphRH0SAVnv3',
	    collapse_key: 'your_collapse_key', 
	    data: {
	        your_custom_data_key: 'your_custom_data_value'
	    },
	    notification: {
	        title: title,
	        body: body
	    }
	};

	fcm.send(message, function(err,response){  
	    if(err) {
	        console.log("Something has gone wrong !");
	    } else {
	        console.log("Successfully sent with resposne :",response);
	    }
	});

}
module.exports = router;