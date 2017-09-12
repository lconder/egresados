var express = require('express');
var mysql = require('mysql');
var request = require('request');
var router = express.Router();


router.post('/', function(req, res, next){
	console.log("Login para las apps móviles")

	var user = req.body.user;
	var password = req.body.password;
	var user_encrypted;


	login_egresado(user, password)
	.then(data => {
			if(data.error!=0){
				res.json(data)
			}else{
				user_encrypted = data.desc.LoginEgresadoResult.usuario

				datos_generales_egresado(data.desc.LoginEgresadoResult.usuario)
				.then(data_general => {

					datos_laborales_egresado(data.desc.LoginEgresadoResult.usuario)
					.then(data_laboral => {

						buscar_egresado(data_general.mat)
						.then(egresado => {

							if(egresado.error==1){
								registrar_egresado(data_general, data_laboral)
								.then(registrado =>{

									res.json({
										'error' : 0,
										'acces' : true,
										'idUser': registrado,
										'data'  : user_encrypted
									})
								})
								.catch(error => {res.json(error);})
							}else{
								res.json({
									'error' : 0,
									'acces' : true,
									'idUser': egresado.id,
									'data'  : user_encrypted
								})
							}
						})
						.catch(error => {res.json(error);})
					})
					.catch(error => {res.json(error);})
				})
				.catch(error => {res.json(error);})
			}	
	})
	.catch(error => {res.json(error);})
});


function registrar_egresado(student, student_job){

	console.log("Inserción de un egresado")
	console.log(student)
	console.log(student_job)

	var array_date = student_job.date_start.split('/');


	var post = {
		name: 				student.name,
		lastname: 			student.lastname,
		second_lastname: 	student.second_lastname,
		mat: 				student.mat,
		photo: 				student.photo,
		email: 				student.email,
		phone: 				student.phone, 
		mobile: 			student.mobile, 
		street_number: 		student.street_number, 
		town: 				"",
		suburb: 			student.suburb, 
		state: 				student.state, 
		city: 				"",
		active: 			1, 
		postal_code: 		student.postal_code,
		created_at: 		new Date(),
		last_login: 		new Date(),
		expired_at: 		new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
		employed: 			1,
		gender: 			student.gender,
		career: 			student.career,
		business_name: 		student_job.business_name,
		business_type: 		student_job.business_type,
		position: 			student_job.position,
		month_start: 		array_date[1], 
		year_start: 		array_date[0]
	};	
	console.log(post);
	return new Promise(function(resolve, reject){

		var connection = mysql.createConnection(info_connection);

		connection.query("INSERT INTO student SET ?", post, function(err, result)
		{
			if(err){
				console.log("Error en el servidor 004")
				console.log(err)
				connection.end(function(err){console.log("connection end...")});
				reject({ 'error':1, 'desc':"Error del servidor 004" })
			}else{
				console.log("usuario creado con éxito")
				console.log(result)
				connection.end(function(err){console.log("connection end...")});
				resolve(result.insertId)
			}
		})
	})
}



function buscar_egresado(matricula){

	console.log("Búsqueda de un egresado con matricula: "+matricula)

	var connection = mysql.createConnection(info_connection);

	return new Promise(function(resolve, reject){
		connection.query("SELECT * FROM student WHERE mat=?", [matricula], function(err, rows, fields)
		{
			if(err){
				console.log("error en el servidor 003")
				console.log(err)
				connection.end(function(err){console.log("connection end...")});
				reject({ 'error':1, 'desc':"Error del servidor 003" })
			}else{
				connection.end(function(err){console.log("connection end...")});
				if(rows.length!=0)
				{
					resolve(rows[0])
				}else{
					resolve({ 'error':1, 'desc':"Error del servidor 003" })
				}
			}
		})
	})
}

function datos_laborales_egresado(student){

	console.log("Obtención de los datos laborales de un egresado ")
	console.log(student)
	var data = {}

	return new Promise(function(resolve, reject){

		request(url+'/DatosLaboralesEgresado?x='+student.cuenta+'&y='+student.contraseña+'&k='+key, function(error, response, body){
			

			if(error){
				console.log("Error del servidor 005")
				reject({ 'error':1, 'desc':"Error del servidor 005" })
			}else{
				datos_laborales = JSON.parse(body);	
				//console.log(datos_laborales.DatosLaboralesEgresadoResult[0].Datos_Laborales_Egresados[0])
				datos = datos_laborales.DatosLaboralesEgresadoResult[0].Datos_Laborales_Egresados

				codigo = datos_laborales.DatosLaboralesEgresadoResult[0].respuesta.codigo
				console.log(codigo)

				if(datos!=null && codigo==200)
				{
					data.business_name 	= (datos[datos.length-1].nombreEmpresa!='')  ? datos[datos.length-1].nombreEmpresa : ''
					data.business_type 	= (datos[datos.length-1].giroEmpresa!='')  ? datos[datos.length-1].giroEmpresa : ''
					data.position 		= (datos[datos.length-1].puesto!='')  ? datos[datos.length-1].puesto : ''
					data.date_start 	= (datos[datos.length-1].fechaIngreso !='') ? datos[datos.length-1].fechaIngreso : '0/0'

				}else{

					data.business_name 	= ''
					data.business_type 	= ''
					data.position 		= ''
					data.date_start 	= '0/0'
				}
				console.log(data)
				resolve(data)
			}

		})
	})
}


function datos_generales_egresado(student){

	console.log("Obtención de los datos generales de un egresado ")
	console.log(student)

	return new Promise(function(resolve, reject){

		request(url+'/DatosGeneralesEgresado?x='+student.cuenta+'&y='+student.contraseña+'&k='+key, function(error, response, body)
		{	
			datos_egresado = JSON.parse(body)
			student = datos_egresado.DatosGeneralesEgresadoResult
			console.log("Datos generales del egresado: ")
			console.log(student)
			if(!error && response.statusCode==200 && student.respuesta.codigo==200)
			{
				
				var data = {
					email : 			student.datos.email,
					name : 				student.datos.nombre,
					lastname : 			student.datos.aPaterno,
					second_lastname : 	student.datos.aMaterno,
					phone : 			student.datos.teléfono,
					mobile : 			student.datos.movil,
					street_number : 	student.datos.calleNum,
					suburb : 			student.datos.colonia,
					postal_code : 		student.datos.codPostal,
					state : 			student.datos.idEstado,
					gender :  			(student.datos.genero=='M') ? 1 : 0,
					photo : 			(student.datos.foto==null) ? '/images/user.png' : student.datos.foto,
					mat : 				student.datos.matricula,
					career : 			student.datos.grado_estudios
				}
				console.log(data)
				resolve(data)
			}else{
				console.log("Error del servidor 002")
				reject({ 'error':1, 'desc':"Error del servidor 002" })
			}
		})
	})
}



function login_egresado(user, password){

	console.log("Login consumiendo los servicios web de ibero con usuario: "+user+" y password: "+password)

	return new Promise(function(resolve, reject){

		request(url+'/LoginEgresado?x='+user+'&y='+password+'&k='+key, function(error, response, body){

			if(!error && response.statusCode == 200){

				student = JSON.parse(body)
				switch(student.LoginEgresadoResult.respuesta.codigo)
				{
					case 200: 
						data = { 'error':0, 'desc':student };
						break;
					case 101:
						data = { 'error':1, 'desc':"No existe el usuario" };
						break;
					case 102:
						data = { 'error':1, 'desc':"Contraseña incorrecta" };
						break;
					case 400:
						data = {  'error':1, 'desc':"Error del Servidor" };						
						break;
					default:
						break;
				}
				resolve(data)
			}else{
				console.log("error en el servidor 001")
				reject({ 'error':1, 'desc':"Error del servidor 001" })
			}
		})
	})
}


module.exports = router;