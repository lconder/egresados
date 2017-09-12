var express = require('express');
var mysql = require('mysql');
var request = require('request');
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
	
	var arrayUsers = [180998,181031,181053,181070,181085,181088,181103,181108,181114,181120,181121,181122,181123,181133,181135,181138,181139,181141,181142,181145,181146,181147,181150,181152,181154,181163,181164,181165,181166,181169,181198,181200,181204,181215,181224,181230,181239,181246,181264,181269,181271,181295,181301,181308,181335,181340,181347,181411,181413,181415,181420,181422,181425,181433,181434,181444,181455,181457,181458,181482,181493,181622,181654,181746,182392,182845,182886,182887,182892,183005,183011,183062,183093,183127,183129,183151,183164,183174,183194,183259,183272,183341,183342,183344,183385,183386,183401,183525,183614,183617,183637,183643,183668,183682,183686,183707]
	var password = "00000";
	var arrayResponse = [];

	for (var i = 0; i < arrayUsers.length; i++) {
		var urlTest = "http://intrauia.iberopuebla.mx/ServiceIberoPuebla/Service.svc/LoginEgresado?x="+arrayUsers[i]+"&y=000000&k="+key
		request(urlTest, function(error, response, body){
			
			if(error){
				console.log(error)
			}else{
				r = JSON.parse(body)
				if(r.LoginEgresadoResult.respuesta.codigo!=200){
					console.log("Error al iniciar sesión")
				}else{
					encrypted_account  =  r.LoginEgresadoResult.usuario.cuenta
					encrypted_password =  r.LoginEgresadoResult.usuario.contraseña
					//console.log(encrypted_password)
					//console.log(encrypted_account)
					//http://intrauia.iberopuebla.mx/ServiceIberoPuebla/Service.svc/DatosLaboralesEgresado?x=uIbDz9wx3Tg=&y=tY/M96m5WvjCvWaD6EAHlA==&k=oNZzKNd9Bckq1bGtPYeIWw==
					var urlTest_1 = "http://intrauia.iberopuebla.mx/ServiceIberoPuebla/Service.svc/DatosLaboralesEgresado?x="+encrypted_account+"&y="+encrypted_password+"&k="+key
					//var urlTest_1 = "http://intrauia.iberopuebla.mx/ServiceIberoPuebla/Service.svc/DatosLaborales_Upd_Insert_Usuario?x="+encrypted_account+"&y="+encrypted_password+"&k="+key+"&a=97,TEST,02,2008,000,EMPRESA"
					request(urlTest_1, function(error, response, body){
						if(error){
							console.log(error)
						}else{
							j = JSON.parse(body)
							console.log(j.DatosLaboralesEgresadoResult[0].Datos_Laborales_Egresados)
							//console.log(j.DatosLaborales_Upd_Insert_UsuarioResult[0].respuesta)
							
							/*arrayData = j.DatosLaboralesEgresadoResult[0].Datos_Laborales_Egresados

							if(arrayData!=null)
							{
								//console.log(arrayData[arrayData.length-1])
								//console.log("\n")
								business_name 	= (arrayData[arrayData.length-1].nombreEmpresa!='')  ? arrayData[arrayData.length-1].nombreEmpresa : ''
								business_type 	= (arrayData[arrayData.length-1].giroEmpresa!='')  ? arrayData[arrayData.length-1].giroEmpresa : ''
								position 		= (arrayData[arrayData.length-1].puesto!='')  ? arrayData[arrayData.length-1].puesto : ''
								date_start 		= (arrayData[arrayData.length-1].fechaIngreso !='') ? arrayData[arrayData.length-1].fechaIngreso : '0/0'
							}else{
								business_name 	= ''
								business_type 	= ''
								position 		= ''
								date_start 		= '0/0'
							}

							console.log(business_name, business_type, position, date_start)
							/*j = JSON.parse(body)
							if(r.LoginEgresadoResult.respuesta.codigo!=200){
								console.log("Error al obtener los datos")
							}else{
								console.log(body)
							}*/
						}
					})
				}
			}
		})
	};
});

module.exports = router;
