var express = require('express');
var mysql = require('mysql');
var router = express.Router();


router.get('/:mat', function(req, res, next){
	console.log("credential by Id");
	var connection = mysql.createConnection(info_connection);
	var data = {"error": 1};
	connection.query("SELECT name, lastname, second_lastname, mat, photo, career, active, email, street_number, suburb, postal_code, phone, mobile   from student WHERE id=?",[req.params.mat], function(err, rows, fields)
	{
		
		if(err){
			throw err;
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


router.put('/', function(req, res, next){
	console.log("Edición de datos de un alumno");
	console.log(req.body);
	/*email: 708509@iberopuebla.mx,
	streetNumber: Calle 99 poniente No. 9512,
	suburb: Jardin,
	postal_code: 72474,
	phone: 2222222222,
	mobile: 4444444444*/

	var data = {"error": 1};
	var changes = [req.body.email, req.body.streetNumber, req.body.suburb, req.body.postal_code, req.body.phone, req.body.mobile, 1, req.body.idUser];
	var connection = mysql.createConnection(info_connection);
	connection.query("UPDATE student SET email = ?, street_number = ?, suburb = ?, postal_code = ?, phone = ?, mobile = ?, active = ? WHERE id = ?", changes, function(err, result){

		if(result.affectedRows==1){
			data["error"] = 0;
			data["description"] = "Data updated successfully";
			data["modified"] = true;	
		}else{
			data["error"] = 1;
			data["description"] = "Error";
			data["modified"] = false;
		}
		
		res.json(data);	
	});


	

});

module.exports = router;