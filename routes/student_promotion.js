var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/:id_student', function(req, res, next){

	var sql = "SELECT sp.date,p.description, b.name, b.address  FROM student s INNER JOIN student_promotions sp ON s.id=sp.id_student INNER JOIN branch_promotions bp ON sp.encrypt_promotion=bp.encrypt INNER JOIN promotions p ON p.id = bp.id_promotion INNER JOIN branch b ON b.id=bp.id_branch  WHERE sp.id_student=?";
	var connection = mysql.createConnection(info_connection);

	connection.query(sql, [req.params.id_student], function(err, rows, fields)
	{
		if(err){
			console.log(err);
			connection.end(function(err){console.log("connection end...")});
			res.json(err);
		}else{
			console.log(rows);
			connection.end(function(err){console.log("connection end...")});
			res.json(rows)
		}
 	});

});

module.exports = router;