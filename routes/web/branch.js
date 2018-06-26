let express = require('express');
let mysql = require('mysql');
let router = express.Router();


router.get('/add', function(req, res){

    if(req.session.level!=1){
        res.render('index', { title: 'Ibero App'});
    }

    res.render('addBranch', {title: "Agregar sucursal", levelUser: req.session.level});
});


router.get('/all', function(req, res, next){

    if(req.session.level!=1){
        res.render('index', { title: 'Ibero App'});
    }

    var connection = mysql.createConnection(info_connection);
    connection.query("SELECT * FROM branch WHERE business_id=?", [req.session.id_business], function(err, rows, fields)
    {
        var business = [];
        if(err){
            connection.end(function(err){console.log("connection end...")});
        }
        else{
            res.render('allBranch', {title: "Todas las sucursales", business: rows, levelUser: req.session.level});
        }
    });
});

router.get('/all/:id', function(req, res, next){

    if(req.session.level!=0){
        res.render('index', { title: 'Ibero App'});
    }

    let id_business = req.params.id

    var connection = mysql.createConnection(info_connection);
    connection.query("SELECT * FROM branch WHERE business_id=?", [id_business],function(err, rows, fields)
    {
        var business = [];
        if(err){
            connection.end(function(err){console.log("connection end...")});
        }
        else{
            res.render('allBranch', {title: "Todas las sucursales", business: rows, levelUser: req.session.level});
        }
    });
});


router.get('/edit/:id', (req, res) => {
    res.render('branch', {title: 'Editar sucursal', levelUser: req.session.level});
});

module.exports = router;