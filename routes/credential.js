var express = require('express');
var mysql = require('mysql');
var request = require('request');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();
var key = 'oNZzKNd9Bckq1bGtPYeIWw=='

//----------------------------API-------------------------------------------------//

router.get('/:mat', function(req, res, next){
	console.log("credential by Id");
	var connection = mysql.createConnection(info_connection);
	var data = {"error": 1};
	connection.query("SELECT name, lastname, second_lastname, mat, photo, gender,career, active, email, street_number, suburb, postal_code, phone, mobile, business_name, business_type, position, year_start, month_start   from student WHERE id=?",[req.params.mat], function(err, rows, fields)
	{
		
		if(err){
			res.json(err);
			connection.end(function(err){console.log("connection end...")});
		}
		else{
			if(rows.length != 0)
			{
				data["error"]=0;
				data["student"]=rows;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				data["student"] = "No students were found!";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}
		}

 	});
});


router.post('/img/:id_student', function(req, res ,next){

	console.log(req.files)

	var data = {"error":1};
	var dir = "public/img_users/";
	var short_dir = "/img_users/"
	var name = "profile_"+req.params.id_student;
	var extension = req.files.img.originalname.split(".").pop();
	var profile_img = dir+name+"."+extension;
	var short_profile_img = short_dir+name+"."+extension;

	console.log(short_profile_img)

	fs.rename(req.files.img.path, profile_img, function(err){
		if(err){
			data["description"] = err;
			res.json(data);
		}else{
			var connection = mysql.createConnection(info_connection);
			changes = [short_profile_img,req.params.id_student];
			connection.query("UPDATE student SET photo = ? WHERE id = ?", changes, function(err, result){
				if(err){
					data["description"] = err;
					connection.end(function(err){console.log("connection end...")});
					res.json(data);
				}else{
					if(result.affectedRows == 1){
						console.log("data updated");
						data["error"]=0;
						data["description"]="Imagen actualizada con éxito";
						connection.end(function(err){console.log("connection end...")});
						res.json(data);
					}else{
						data["student"] = "Hemos encontrado un error";
						connection.end(function(err){console.log("connection end...")});
						res.json(data);
					}	
				}
				
			});
		}
			
	});


});

//----------------------------API-------------------------------------------------//
router.put('/', function(req, res, next){
	console.log("Edición de datos de un alumno");

	var data = {"error": 1};
	var changes = [req.body.email, req.body.streetNumber, req.body.suburb, req.body.postal_code, req.body.phone, req.body.mobile, 1, req.body.business_name, req.body.business_type , req.body.position, req.body.month_start, req.body.year_start, req.body.idUser];
	var account = req.body.user;
	var password = req.body.password;

	var dat = "/UpdateDatos_UsuarioDatosGeneral?x="+account+"&y="+password+"&k="+key+"&a="+req.body.email+","+req.body.streetNumber+","+req.body.suburb+",21,"+req.body.postal_code+","+req.body.phone+","+req.body.mobile;
	console.log(dat);
	var dat_1 = "/DatosLaborales_Upd_Insert_Usuario?x="+account+"&y="+password+"&k="+key+"&a="+req.body.business_type+","+req.body.position+","+req.body.month_start+","+req.body.year_start+",000,"+req.body.business_name;
	console.log(dat_1);

	updateStudent(changes)
	.then(d => {
		if(d.error==0 && d.modified==true){

			setStudentById(dat)
			.then(success => {
				if(success.codigo==200){
					setStudentJobById(dat_1)
					.then(success_update => {
						console.log(success_update)
						if(success_update.codigo){
							data["error"] = 0;
							data["description"] = "Data updated successfully";
							data["modified"] = true;
							res.json(data);
						}else{
							data["error"] = 1;
							data["description"] = "Error";
							data["modified"] = false;
							res.json(data)
						}
					})
					.catch(error => {
						data["error"] = 1;
						data["description"] = "Error";
						data["modified"] = false;
						res.json(data)
					})
				}else{
					data["error"] = 1;
					data["description"] = "Error";
					data["modified"] = false;
					res.json(data)
				}
			})
			.catch(error => {
				data["error"] = 1;
				data["description"] = error.desc;
				data["modified"] = false;
				res.json(data)
			})

		}else{
			data["error"] = 1;
			data["description"] = "Error";
			data["modified"] = false;
			res.json(data)
		}
	})
	.catch(error => {
		data["error"] = 1;
		data["description"] = error;
		data["modified"] = false;
		res.json(data)
	})

	
});

function setStudentById(url_params){

	return new Promise(function(resolve, reject){

		request(url+url_params, function(error, response, body)
		{	
			
			if(!error && response.statusCode==200)
			{
				datos = JSON.parse(body)
				update_data = datos.UpdateDatos_UsuarioDatosGeneralResult
				console.log(update_data)
				resolve(update_data.respuesta)
			}else{
				console.log("Error del servidor 001")
				reject({ 'error':1, 'desc':"Error del servidor 001" })
			}
		})

	})

}

function setStudentJobById(url_params){

	return new Promise(function(resolve, reject){

		request(url+url_params, function(error, response, body)
		{	
			
			if(!error && response.statusCode==200 )
			{
				datos = JSON.parse(body)
				update_data = datos.DatosLaborales_Upd_Insert_UsuarioResult[0]
				console.log(update_data)
				resolve(update_data.respuesta)
			}else{
				console.log("Error del servidor 001")
				reject({ 'error':1, 'desc':"Error del servidor 001" })
			}
		})
	})

}

function updateStudent(fields){

	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);

	return new Promise(function(resolve, reject){
		connection.query("UPDATE student SET email = ?, street_number = ?, suburb = ?, postal_code = ?, phone = ?, mobile = ?, active = ?, business_name = ?, business_type = ?, position = ?, month_start = ?, year_start = ? WHERE id = ?", fields, function(err, result){

			if(err){
				return reject(err)
			}else{
				if(result.affectedRows==1){
					data["error"] = 0;
					data["description"] = "Data updated successfully";
					data["modified"] = true;
					resolve(data)	
				}else{
					data["error"] = 1;
					data["description"] = "Error";
					data["modified"] = false;
					resolve(data)
				}
			}	
		})
	})
}


module.exports = router;