var express = require('express');
var mysql = require('mysql');
var moment = require('moment');
let shortid = require('shortid');
var queries = require('../utils/queries');
var errors = require('../utils/error');
var objects = require('../utils/objects');
var router = express.Router();

router.get('/:id', function(req, res, next){

	var data = {"error": 1, "promotion":""};
	let today = moment().format("YYYY-MM-DD");
	let id = req.params.id;
	let connection = mysql.createConnection(info_connection);
	connection.query(queries.query_get_full_promotion, [id,1, today], (err, rows) => {
		if(err){
			res.json({"err":1, "desc": err});
		}else{
			if(rows.length!=0)
			{
				data.error = 0;
				data.promotion = rows[0];
			}else{
				data.error = 1;
				data.description = "No se han encontrado promociones";
			}
		}
		res.json(data);
	});
});

router.post('/:id', function(req, res){

	let id = req.params.id;
	let connection = mysql.createConnection(info_connection);
	connection.query(queries.query_get_branch_promotion_by_encrypt, [id], (err, rows) => {
		if(err){
			res.status(errors.ERROR_CLIENT).json(err);
		}else{
			if(rows.length>0) {
				connection.query(queries.query_update_count_in_branch_promotion, [id], (err, result) => {
					if(err){
                        res.status(errors.ERROR_CLIENT).json(err);
					}else{
						if(result.affectedRows==1){
							connection.end((err) => console.log(err));
							postDataUserPromo(req.body.student, req.params.id)
								.then(res.status(errors.NO_ERROR).json(objects.success_promo_edit()))
								.catch(err => console.error(err))
						}
					}
				});
			}
		}
	});
});

router.put('/:id/', (req,res) => {

	let id = req.params.id;
	let branches = req.body.branches;
    console.log(branches);
	let name = req.body.name;
	let created_at = req.body.created_at;
	let expired_at = req.body.expired_at;
	let description = req.body.description;
    let connection = mysql.createConnection(info_connection);
	connection.query(queries.query_update_promotion_by_id, [name, created_at, expired_at, description, id], (err, rows) => {

        if (err) {
            connection.end((err) => console.error(err));
            res.status(errors.ERROR_CLIENT).json(err);
        }else{
        	updateBranches(branches, id)
				.then(success => console.log(success))
				.catch(err => console.error(err))
            res.status(errors.NO_ERROR).json(rows);
        }

	});
});


router.patch('/activate/', function(req, res, next){
	var data = {"error":1};
	console.log(req.body);
	console.log('req.body');
	var id = req.body.id;
	var status = req.body.status;
	var connection = mysql.createConnection(info_connection);
	connection.query("UPDATE branch_promotions SET active = ? WHERE encrypt = ?", [status,id], function(err, result){
		console.log(err, result);
		if(err)
			res.json(err);
		else{
			if(result.affectedRows==1){
				data["error"]=0;
				data["updated"]=true;
				connection.end(function(err){console.log("connection end...")});
				res.json(data);
			}else{
				res.json(data);
			}	
		}
		
	});
});

function postDataUserPromo(student, promotion){

    return new Promise((resolve, reject) => {
		let connection = mysql.createConnection(info_connection);
		let insert = {
			id_student: student,
			encrypt_promotion: promotion,
			date: new Date()
		};
		connection.query(queries.query_insert_student_promotion,insert, (err, result) => {
			if(err)
				reject(err);
			else
				resolve(result);
		});
	});
}

function updateBranches(branches, id_promotion){

    return new Promise((resolve, reject) => {

        let connection = mysql.createConnection(info_connection);
        branches.forEach( (b) => {
            connection.query(queries.query_get_branch_promotion, [b.id, id_promotion], (err, rows) => {
				let id_branch = b.id;
				let active = b.active || false;
            	if(err)
            		reject(err)

                if(rows.length>0){
                    console.log(`La branch_promotion si existe y la band = ${active}`);
            		if (active){
                        handlePromo(2, id_branch, id_promotion);
					}else{
                        handlePromo(0, id_branch, id_promotion);
					}
                }else{
                    console.log(`La branch_promotion no existe y la band = ${active}`);
            		if(active){
                        handlePromo(1, id_branch, id_promotion);
					}else{

					}
                }
            });
        });
        resolve('éxito');
    });

}

function handlePromo(action, id_branch, id_promotion){

	let query;
	let body;
    let encrypt = shortid.generate();

	switch (action){
		case 0:
			query = "UPDATE branch_promotions SET visible=0 WHERE id_branch=? AND id_promotion=?;";
			body = [id_branch, id_promotion];
			break;
		case 1:
            query = "INSERT INTO branch_promotions SET ?;";
            body = {id_branch, id_promotion, encrypt};
			break;
		case 2:
            query = "UPDATE branch_promotions SET visible=1 WHERE id_branch=? AND id_promotion=?;";
            body = [id_branch, id_promotion];
            break;
	}

    let connection = mysql.createConnection(info_connection);
	connection.query(query, body, (err, rows) =>{
		if(err)
			console.error(err);
		else
			console.log(rows);
	});

}


module.exports = router;