var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var async = require('async');
var query = require('../utils/queries');


router.get('/:state/', (req, res) => {

    let page = req.query.page;
    let offset = 0;
    let limit = 10;

    if(page)
        offset = page*limit;

	let data = {"error": 1,"business":""};
	let connection = mysql.createConnection(info_connection);
	connection.query(query.query_get_business_by_state_order_by_name+ ' LIMIT 10 OFFSET ' + offset, [req.params.state],function(err, rows, fields){
		if(err)
			res.json(data);
		else{
			if(rows.length != 0)
			{
				data.error = 0;
				business = rows;
				
				var c=0;
				async.each(business, function(item, cb){
					connection.query("SELECT * FROM promotions WHERE business_id=?",[item.id], function(err, rows, fields){
						if(err)
							console.log(err);
						business[c].promotions = rows;
						c++;	
						cb();
					});
					
					
				}, function(err){
					if(err)
						console.log(err);
					connection.end(function(err){console.log("connection end...")});
					data.business = business;
					res.json(data);
				});
				
			}else{
				data.business = "No business was found!";
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}	
		}
	});
});

module.exports = router;