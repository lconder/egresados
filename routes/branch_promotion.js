let express = require('express');
let mysql = require('mysql');
let queries = require('../utils/queries');
let router = express.Router();


router.get('/:id_promotion', (req, res) => {

	let data = {"error": 1};

	let connection = mysql.createConnection(info_connection);
	connection.query(queries.query_get_branches_by_promotion, [req.params.id_promotion], (err, rows) => {
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
