var express = require('express');
var mysql = require('mysql');
var async = require('async');
var router = express.Router();

//Obtener las sucursales en las que se encuentra activa cierta promoción.
router.get('/:id_promotion', function(req, res, next){
	var data = {"error": 1};
	var connection = mysql.createConnection(info_connection);
	sql = "SELECT b.address, b.latitude, b.longitude, b.name, c.graduated FROM branch_promotions p INNER JOIN branch b ON p.id_branch = b.id  INNER JOIN business c ON c.id = b.business_id WHERE p.id_promotion=?";
	connection.query(sql, [req.params.id_promotion], function(err, rows, fields){
		if(err){
			res.json({"error":1, "description": err});
		}else{
			if(rows.length != 0)
			{
				data["error"] = 0;
				data["branchs"] = rows;
			}else{
				data["error"] = 1;
				data["description"] = "No branchs found";
			}
		}
		res.json(data);
	});
});


module.exports = router;
