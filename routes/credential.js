var express = require('express');
var mysql = require('mysql');
var request = require('request');
var router = express.Router();
var key = 'oNZzKNd9Bckq1bGtPYeIWw=='

//----------------------------API-------------------------------------------------//
router.get('/:mat', function(req, res, next){
	console.log("credential by Id");
	var connection = mysql.createConnection(info_connection);
	var data = {"error": 1};
	connection.query("SELECT name, lastname, second_lastname, mat, photo, gender,career, active, email, street_number, suburb, postal_code, phone, mobile   from student WHERE id=?",[req.params.mat], function(err, rows, fields)
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

//----------------------------API-------------------------------------------------//
router.put('/', function(req, res, next){
	console.log("Edición de datos de un alumno");

	var data = {"error": 1};
	var changes = [req.body.email, req.body.streetNumber, req.body.suburb, req.body.postal_code, req.body.phone, req.body.mobile, 1, req.body.idUser];
	var account = req.body.user;
	var password = req.body.password;

	var dat = "/UpdateDatos_UsuarioDatosGeneral?x="+account+"&y="+password+"&k="+key+"&a="+req.body.email+","+req.body.streetNumber+","+req.body.suburb+",21,"+req.body.postal_code+","+req.body.phone+","+req.body.mobile;
	console.log(dat);

	updateStudent(changes)
	.then(d => {
		if(d.error==0 && d.modified==true){

			setStudentById(dat)
			.then(success => {
				if(success.codigo==200){
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
			
			if(!error && response.statusCode==200 /*&& student.respuesta.codigo==200*/)
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

function updateStudent(fields){

	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);

	return new Promise(function(resolve, reject){
		connection.query("UPDATE student SET email = ?, street_number = ?, suburb = ?, postal_code = ?, phone = ?, mobile = ?, active = ? WHERE id = ?", fields, function(err, result){

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
			//res.json(data);	
		})
	})
}



module.exports = router;