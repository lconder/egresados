let express = require('express');
let mysql = require('mysql');
let query = require('../../utils/queries');
let objects = require('../../utils/objects');
let router = express.Router();


router.get('/edit/:id', function(req, res) {

    let id = req.params.id

    getPromoInfo(id)
        .then(info_promo => {
            id_business = info_promo[0].business_id;
            getBranchs(id_business)
                .then(branchs => {
                    let promotion = objects.editPromo(info_promo, branchs)
                    res.render('promotion', {title: 'Promoción', id_promotion:id, promotion: promotion, business: promotion.branchs, levelUser: req.session.level});
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch(err => {
            console.error(err)
        })
});


function getPromoInfo(id_promo) {

    return new Promise(function(resolve, reject){

        let connection = mysql.createConnection(info_connection);
        connection.query(query.query_get_promo_info_full, [id_promo], (err, rows, fields) => {

            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })

}

function getBranchs(id_business) {

    return new Promise(function(resolve, reject){
        let connection = mysql.createConnection(info_connection);
        connection.query(query.query_get_branchs_by_id, [id_business], (err, rows, fields) => {

            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}

module.exports = router;