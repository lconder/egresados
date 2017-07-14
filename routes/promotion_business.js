var express = require('express');
var mysql = require('mysql');
var sha1 = require('sha1')
var moment = require('moment')
var async = require('async')
var shortid = require('shortid');
var FCM = require('fcm-push');
var config = require('../config');
var serverKey = config.serverKey;
var fcm = new FCM(serverKey);
var router = express.Router();


router.post('/', function(req, res, next){
	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);

	

	if(req.session.id_business != null)
	{
		sendPush(req.body.name, req.body.promo_description);
		
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
	var data = {"error": 1,"promos":""};
	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT b.name as name_branch, b.address, s. * , p.name, p.description FROM branch b INNER JOIN branch_promotions s ON b.id = s.id_branch INNER JOIN promotions p ON p.id = s.id_promotion WHERE b.business_id=?", [req.session.id_business],function(err, rows, fields){
    
		if(!err){
			connection.end(function(err){console.log("connection end...")});
			data.promos = rows
			res.render('allPromotions', {title: 'Todas mis promociones', levelUser: req.session.level, data: data})
		}else{
			connection.end(function(err){console.log("connection end...")});
			res.json(data);
		}
	});
})


function sendPush(title, body){


	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT * FROM devices",function(err, rows, fields)
	{
		var business = [];
		if(err){
			console.log(err);
			connection.end(function(err){console.log("connection end...")});
			//page error
		}
		else{
			for (var i = rows.length - 1; i >= 0; i--) {
				console.log(rows[i].token)
				var message = {
				    to: rows[i].token,//'dh136KWZBbw:APA91bHkSRylKpYl-ZKCystHL9WU3krVJMG1eycON6dpLG5a2EYZF4yct2J9GJaVA4AHAfbw6X_fpJKM20ParZqsgQZkZ7BaasZdSL0d0iGBkPauU-9cDuMy5Xdkz4W9pZXbrPCisnMe',
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
				        console.log("Something has gone wrong !", err);
				    } else {
				        console.log("Successfully sent with response :",response);
				    }
				});
			};
		}
 	});

	

}
module.exports = router;