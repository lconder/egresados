let express = require('express');
let mysql = require('mysql');
let request = require('request');
let query = require('../utils/queries');
let errors = require('../utils/error');
let objects = require('../utils/objects');
let router = express.Router();


router.post('/address/', function(req, res){

    let lat = req.body.lat;
    let lng = req.body.lng;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${key_maps}`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            address = JSON.parse(body);
            res.json({address: address.results[0].formatted_address});
        }else{
            res.json(error)
        }
    });
});


router.post('/', function(req, res){

	var data = {error: 1};

    let branch = {
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        address: req.body.address,
        business_id: req.session.id_business
    };

    let connection = mysql.createConnection(info_connection);

    connection.query(query.query_insert_branch, branch, function(err, result){
        if(err){
            connection.end( (err) => console.error(err));
            throw err;
        }else{
            if(result.affectedRows===1){
                data.error	= 0;
                data.branch	= {
                    created: true,
                    id: result.insertId
                };
                connection.end( (err) => console.error(err));
                res.json(data);
            }
        }
    });
});

router.get('/', function(req, res){

	let data = {error: 1, business: []};
	let connection = mysql.createConnection(info_connection);
	connection.query(query.query_get_business_and_branchs, (err, rows) => {

		if(err){
			connection.end( (err) => console.error(err));
			res.status(errors.ERROR_CLIENT).json(data);
		} else {

			let business = (rows.length !== 0) ? rows : errors.NO_BUSINESS_FOUND;
            connection.end((err) => console.error(err));
            res.status(errors.NO_ERROR).json(objects.branchs_by_business(business));

		}
 	});
});


module.exports = router;