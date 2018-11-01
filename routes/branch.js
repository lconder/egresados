let express = require('express');
let mysql = require('mysql');
let request = require('request');
let query = require('../utils/queries');
let errors = require('../utils/error');
let objects = require('../utils/objects');
let router = express.Router();


router.post('/address/', (req, res) => {

    let lat = req.body.lat;
    let lng = req.body.lng;
    let url_maps = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${key_maps}`;

    console.log(url_maps);

    request(url_maps, (error, response, body) => {
        if (!error && response.statusCode==200) {
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

router.get('/', function(req, res) {

    let page = req.query.page;
    let offset = 0;
    let limit = 10;

    if(page)
        offset = page*limit;

	let data = {error: 1, business: []};
	let connection = mysql.createConnection(info_connection);
	console.log(query.query_get_business_and_branchs+ ' LIMIT 10 OFFSET ' + offset);
	connection.query(query.query_get_business_and_branchs+ ' LIMIT 10 OFFSET ' + offset, (err, rows) => {

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

router.get('/:id', (req, res) => {

    let id = req.params.id;
    let connection = mysql.createConnection(info_connection);
    connection.query(query.query_get_branch_by_id, [id], (err, rows) => {

        if(err) {
          connection.end((err) => console.error(err));
          res.status(errors.ERROR_CLIENT).json(err);
        } else {
            if(rows.length>0)
                res.status(errors.NO_ERROR).json(objects.branch(rows));
            else
                res.status(errors.ERROR_CLIENT).json(errors.invalid_id());
        }

    });
});

router.put('/:id', (req, res) => {

    console.log(req.body);
    console.log(req.params);

    let id = req.params.id;
    let name = req.body.name;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let address = req.body.address;
    let connection = mysql.createConnection(info_connection);
    connection.query(query.query_update_branch_by_id, [name, latitude, longitude, address, id], (err, rows) => {

        if (err) {
            connection.end((err) => console.error(err));
            res.status(errors.ERROR_CLIENT).json(err);
        }else{
            res.status(errors.NO_ERROR).json(rows);
        }

    });
});


module.exports = router;