let express = require('express');
let mysql = require('mysql');
let request = require('request');
let fs = require('fs');
let router = express.Router();
let iconv  = require('iconv-lite');
let query = require('../utils/queries');
let errors = require('../utils/error');
let key = 'oNZzKNd9Bckq1bGtPYeIWw=='


router.get('/:mat', function(req, res){

	let connection = mysql.createConnection(info_connection);
	var data = {"error": 1};
	connection.query(query.query_get_credential, [req.params.mat], (err, rows) =>  {
		if(err) {
			res.status(errors.ERROR_CLIENT).json(err);
			connection.end( (err) => { console.error(err) });
		}
		else{
			if(rows.length != 0) {
				data.error = 0;
				data.student = rows;
				connection.end( (err) => {console.error(err) });
                res.status(errors.NO_ERROR).json(data);
			}else{
				data.student = "No students were found!";
				connection.end((err) => {console.error(err)});
                res.status(errors.NO_ERROR).json(data);
			}
		}

 	});
});


router.post('/img/:id_student', function(req, res) {


	var data = {"error":1};
	var dir = "../public/img_users/";
	var short_dir = "/img_users/"
	var name = "profile_"+req.params.id_student;
	var extension = req.files.img.originalname.split(".").pop();
	var profile_img = dir+name+"."+extension;
	var short_profile_img = short_dir+name+"."+extension;


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

/**
*
*/
router.put('/', function(req, res, next){
	console.log("Edición de datos de un alumno");
	console.log(req.body)

	var data = {"error": 1};
	var business_type = "Desconocido"
	switch(req.body.business_type){

		case "95": business_type="Agropecuarias"; break;
		case "96": business_type="Mineras";break;
		case "97": business_type="Servicios";break;
		case "98": business_type="Industria";break;
		case "99": business_type="Comercio";break;
		default: business_type="Desconocido";break;
	}

	let array_date = req.body.date_start.split('/')
	let day_start = array_date[0];
	let month_start = array_date[1];
	let year_start = array_date[2];

	var changes = [req.body.email, req.body.streetNumber, req.body.suburb, req.body.postal_code, req.body.phone, req.body.mobile, 1, req.body.business_name, business_type , req.body.position, day_start, month_start, year_start, req.body.idUser];
	var account = req.body.user;
	var password = req.body.password;

	var dat = "/UpdateDatos_UsuarioDatosGeneral?x="+account+"&y="+password+"&k="+key+"&a="+req.body.email+","+req.body.streetNumber+","+req.body.suburb+",21,"+req.body.postal_code+","+req.body.phone+","+req.body.mobile;
	var dat_1 = "/DatosLaborales_Upd_Insert_Usuario?x="+account+"&y="+password+"&k="+key+"&a="+req.body.business_type+","+req.body.position+","+month_start+","+year_start+",000,"+req.body.business_name;

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

	var utf8String = iconv.decode(new Buffer(url_params), "ISO-8859-1");
	console.log(utf8String);

	return new Promise(function(resolve, reject){

		request({url: url+utf8String, encoding: null}, function(error, response, body)
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

		var utf8String = iconv.decode(new Buffer(url_params), "ISO-8859-1")
		

		request({url: url+utf8String, encoding: null},function(error, response, body)
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
		connection.query("UPDATE student SET email = ?, street_number = ?, suburb = ?, postal_code = ?, phone = ?, mobile = ?, active = ?, business_name = ?, business_type = ?, position = ?, day_start = ?, month_start = ?, year_start = ? WHERE id = ?", fields, function(err, result){

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