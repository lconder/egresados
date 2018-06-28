let express = require('express');
let mysql = require('mysql');
let async = require('async');
let shortid = require('shortid');
let FCM = require('fcm-push');
let config = require('../config');
let serverKey = config.serverKey;
let fcm = new FCM(serverKey);
let queries = require('../utils/queries');
let strings = require('../utils/strings');
let errors = require('../utils/error');
let router = express.Router();

//:TODO
router.post('/', function(req, res){
	var data = {"error": 1};
	let connection = mysql.createConnection(info_connection);
	let date_expired = req.body.expired_date.split("/");
	let date_created = req.body.created_at.split("/");
	let de = new Date(date_expired[2],date_expired[1]-1,date_expired[0])
	let dc = new Date(date_created[2],date_created[1]-1,date_created[0])
	let id_business = req.session.id_business;

	let promo = {
		name: req.body.name,
		description: req.body.promo_description,
		count: 0,
		expired_at: de,
		created_at: dc,
		business_id: id_business
	};

	getBussinessById(id_business)
	.then(business => {
		getPromosByBusiness(id_business)
			.then(promos => {
				business[0].promotions = promos;
				sendPush(req.body.name, req.body.promo_description, business[0]);
			})
			.catch(err => console.error(err))
	})
	.catch(err => console.error(err));


	if( (dc <= getToday()) && (getToday() <= de) ) {

	} else {
		console.log("NO Se envia notificación, promoción futura");
	}


	connection.query("INSERT INTO promotions SET ?", promo, function(err, result){
		if(err){
			connection.end((err) => console.log(err));
			res.status(errors.ERROR_CLIENT).json(err);
		}else{
			if(result.affectedRows==1){
				let id = result.insertId;
				let branchs = req.body.branch;
				let c=0;
				async.each(branchs, (item, cb) => {
					let insert = {
						id_branch: item,
						id_promotion: id,
						count: 0,
						encrypt: shortid.generate(),
						active: 1
					};
					connection.query("INSERT INTO branch_promotions SET ?", insert, (err) => {
						if(err){
                            console.log(err);
						}
						c++;
						cb();
					});
				}, (err) => {
					if(err){
                        console.log(err);
					}
					data.error =0;
					data.promo = {
						created: true
					};
					connection.end((err) => console.log(err));
					res.status(errors.NO_ERROR).json(data);
				});
			}
		}
	});
});


router.get('/add', function(req, res){

	if(req.session.level!=1)
		res.render('index', { title: strings.MAIN_TITLE});

	let connection = mysql.createConnection(info_connection);
	if(req.session.id_business != null){
		connection.query("SELECT * FROM branch WHERE business_id=?", [req.session.id_business], (err, rows) => {
			res.render('addPromotion', {title: 'Agregar Promoción', business: rows, levelUser: req.session.level});
		});
	}else{
		console.log("error...");
	}
});


router.get('/all', function(req, res){

	if(req.session.level!=1)
		res.render('index', { title: strings.MAIN_TITLE});

	let id_business = req.session.id_business;
	let data = {"error": 1,"promos":""};
	let connection = mysql.createConnection(info_connection);
	connection.query(queries.query_get_full_branch_promotions_by_id_business, [id_business], (err, rows) => {

		if(!err){
			connection.end((err) => console.log(err));
			data.promos = rows;
			res.render('allPromotions', {title: 'Todas mis promociones', levelUser: req.session.level, data: data})
		}else{
			connection.end((err) => console.log(err));
		}
	});
});


router.get('/all/:id', function(req, res){


	if(req.session.level!=0) 
		res.render('index', { title: strings.MAIN_TITLE});

	let id_business = req.params.id 

	var data = {"error": 1,"promos":""};
	let connection = mysql.createConnection(info_connection);
	connection.query(queries.query_get_full_branch_promotions_by_id_business, [id_business], (err, rows) => {

		if(!err){
            connection.end((err) => console.log(err));
			data.promos = rows;
			res.render('allPromotions', {title: 'Todas mis promociones', levelUser: req.session.level, data: data})
		}else{
			connection.end((err) => console.log(err));
			res.json(data);
		}
	});
})


function sendPush(name, description, business_promotions){
	console.log(business_promotions);

	let title = `Nueva promoción en ${business_promotions.name}`;
	let body = `${name} | ${description}`;

	let connection = mysql.createConnection(info_connection);
	connection.query(queries.query_get_devices, (err, rows) => {
		if(err){
			connection.end((err) => console.log(err));
		} else {

			let tokens = rows.map( (row) => {
				return row['token'];
			});

            let message = {
                registration_ids: tokens,
                data: {
                    business : business_promotions,
                    title: title,
                    body: body
                },
                notification: {
                    title: title,
                    body: body
                }
            };

            fcm.send(message)
                .then(response => console.log(response))
                .catch(error => console.log(error))
		}
 	});
}

function getToday(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yyyy = today.getFullYear();

	if(dd<10)
	    dd = '0'+dd

	if(mm<10)
	    mm = '0'+mm

	return new Date()
}

function getBussinessById(id_business){

	return new Promise((resolve, reject) => {

        let connection = mysql.createConnection(info_connection);
        connection.query(queries.query_get_business_by_id, [id_business], (err, rows) => {
            connection.end();
			if(err) {
				reject(err);
			}else{
				resolve(rows);
			}

        });

	});
}

function getPromosByBusiness(id_business) {

	return new Promise((resolve, reject) => {

        let connection = mysql.createConnection(info_connection);
        connection.query(queries.query_get_promos_by_id_business,[id_business] ,(err, rows) => {
            connection.end();
        	if(err) {
                reject(err);
            }else{
                resolve(rows);
            }

		});

    });
}



module.exports = router;
