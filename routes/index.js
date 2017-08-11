var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var generateDocx = require('generate-docx');
var fs = require('fs');
var moment = require('moment');

var options = {
  template: {
    filePath: 'public/templates/convenio.docx',
    data: {
      'business_name': 'Test',
      'attendant_name': 'Test attendant',
      'address': '3 poniente 313 ',
      'attendant_email': 'algo@algo.mx',
      'rfc': 'XAX1000',
      'date': moment(new Date()).format("DD/MM/YYYY"),
      'day': new Date().getDate(),
      'month': new Date().getMonth()+1
    }
  },
  save: {
    filePath: 'public/templates/agreement.docx'
  }
}


router.get('/', function(req, res, next) {

	console.log(req.session.level);
	switch(req.session.level){
		case 0://admin
			console.log("admin")
			res.redirect('/dashboard');
			break;
		case 1:
			console.log("business")
			res.redirect('/settings');
			break;
		case 3:
			console.log("guess")
			res.render('index', { title: 'Ibero App' });
			break;
		case 4:
			console.log("business")
			res.redirect('/admin');
			break;
		default:
			res.render('index', { title: 'Ibero App' });
			break;
	}
	
});

router.get('/dashboard', function(req, res, next) {

	
	if(req.session.level!=0){
		res.render('index', { title: 'Ibero App'});
	}

	var connection = mysql.createConnection(info_connection);
	connection.query("SELECT COUNT(*) AS C FROM student", function(err, rows, fields){
		if(!err){
			var C = rows[0].C;
			connection.query("SELECT COUNT(*) AS C FROM business", function(err, rows, fields){
				if(!err){
					var Cb = rows[0].C;
					connection.query("SELECT COUNT(*) AS C FROM promotions", function(err, rows, fields){
						if(!err){
							var Cp = rows[0].C;
							connection.end(function(err){console.log("connection end...")});
							res.render('dashboard', { title: 'Ibero App', levelUser: req.session.level, C:C, Cb: Cb, Cp: Cp});
						}else{
							connection.end(function(err){console.log("connection end...")});
						}
					});
				}else{
					connection.end(function(err){console.log("connection end...")});
				}
			});
		}else{
			connection.end(function(err){console.log("connection end...")});
		}
	});
});

router.get('/logout', function(req, res, next) {
	req.session.level = null;
	req.session.id_business = null;
	res.render('index', { title: 'Ibero App'});
});

router.post('/test', function(req, res, next){
	
	console.log(req.body)
	var array = req.body.date.split('/')
	res.json(array[0])

	
});



module.exports = router;
