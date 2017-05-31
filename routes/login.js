var express = require('express');
var mysql = require('mysql');
var request = require('request');
var router = express.Router();


router.get('/', function(req, res, next){
	console.log("login");
});

router.post('/', function(req, res, next){
	console.log("POST para iniciar sesión");
	var user = req.body.user;
	var password = req.body.password;
	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);
	if(user=="adminb" && password == "adminb"){
		req.session.level = 1 ;// 1 = BUSINESS
		res.json({"error":0, "level":1});
	}else{
		if(user=="admin" && password == "admin"){
			req.session.level = 0;// 0 = SUPERUSER
			res.json({"error":0, "level":0});
		}else{
			request(url+'/LoginEgresado?x='+user+'&y='+password+'&k=oNZzKNd9Bckq1bGtPYeIWw==', function(error, response, body)
			{
				if(!error && response.statusCode == 200)
				{
					rs = JSON.parse(body);
					console.log("RS:");
					console.log(rs);
					console.log("-------------");
					user_data = rs.LoginEgresadoResult.usuario;
					if(rs.LoginEgresadoResult.respuesta.codigo == 101){
						res.json({"error":1, "desc":"No existe el usuario"});
					}else if(rs.LoginEgresadoResult.respuesta.codigo == 102){
						res.json({"error":1, "desc":"Contraseña incorrecta"});
					}else if(rs.LoginEgresadoResult.respuesta.codigo == 400){
						res.json({"error":1, "desc":"Error del servidor"});
					}else if(rs.LoginEgresadoResult.respuesta.codigo == 200)
					{
						cuenta = rs.LoginEgresadoResult.usuario.cuenta; 
						contraseña = rs.LoginEgresadoResult.usuario.contraseña;
						request(url+'/DatosGeneralesEgresado?x='+cuenta+'&y='+contraseña+'&k=oNZzKNd9Bckq1bGtPYeIWw==', function(error, response, body)
						{
							if(!error && response.statusCode==200)
							{
								datos_egresado = JSON.parse(body);
								console.log(datos_egresado);
								if(datos_egresado.DatosGeneralesEgresadoResult.respuesta.codigo == 200)
								{
									email = datos_egresado.DatosGeneralesEgresadoResult.datos.email;
									name = datos_egresado.DatosGeneralesEgresadoResult.datos.nombre;
									lastname = datos_egresado.DatosGeneralesEgresadoResult.datos.aPaterno;
									second_lastname = datos_egresado.DatosGeneralesEgresadoResult.datos.aMaterno;
									phone = datos_egresado.DatosGeneralesEgresadoResult.datos.teléfono;
									mobile = datos_egresado.DatosGeneralesEgresadoResult.datos.movil;
									street_number = datos_egresado.DatosGeneralesEgresadoResult.datos.calleNum;
									suburb = datos_egresado.DatosGeneralesEgresadoResult.datos.colonia;
									postal_code = datos_egresado.DatosGeneralesEgresadoResult.datos.codPostal;
									state = datos_egresado.DatosGeneralesEgresadoResult.datos.idEstado;
									photo = (datos_egresado.DatosGeneralesEgresadoResult.datos.foto==null) ? '/images/user.png' : datos_egresado.DatosGeneralesEgresadoResult.datos.foto;
									mat = datos_egresado.DatosGeneralesEgresadoResult.datos.matricula;
									console.log("Buscando un estudiante por email en la DB");
									connection.query("SELECT * FROM student WHERE email=?", [email], function(err, rows, fields)
									{
										if(err){
											data["error"]=1;
											data["desc"]=err;
											connection.end(function(err){console.log("connection end...")});
											res.json(data);
										}else{
											if(rows.length != 0)
											{
												data["error"]=0;
												data["access"]=true;
												data["idUser"]=rows[0].id;
												data["data"] = user_data;
												connection.end(function(err){console.log("connection end...")});
												console.log("Usuario registrado previamente, enviando...");
												res.json(data);
											}else{		
												console.log("user don´t found on database.");
												console.log("creating user...");
												var post = {
													name: name,
													lastname: lastname,
													second_lastname: second_lastname,
													mat: mat,
													photo: photo,
													email: email,
													phone: phone, 
													mobile: mobile, 
													street_number: street_number, 
													town: "", 
													suburb: suburb, 
													state: state, 
													city: "",
													active: 0, 
													postal_code: postal_code,
													created_at: new Date(),
													last_login: new Date() ,
													employed: 0
												};			
												connection.query("INSERT INTO student SET ?", post, function(err, result){
													if(err){
														console.log("error creando usuario: "+err);
														data["err"]=err;
														connection.end(function(err){console.log("connection end...")});
														res.json(data);
													}else{
														console.log("usuario creado", result);
														data["error"]=0;
														data["access"]=true;
														data["idUser"]=result.insertId;
														connection.end(function(err){console.log("connection end...")});
														res.json(data);
													}
												});
											}
										}
							  		});
								}else{
									res.json({"error":1, "desc":"Error del servidor."});
								}
							}else{
								res.json({"error":1, "desc":"Error del servidor.."});
							}
						});//fin request datos generales
					}// fin else 200
				}else{
					console.log("Error en petición server: "+error, response.statusCode);
					res.json({"error":1,"desc":"error servidor"});
				}
			});
		}
	}	
});

module.exports = router;