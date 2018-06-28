let express = require('express');
let mysql = require('mysql');
let query = require('../../utils/queries');
let strings = require('../../utils/strings');

let router = express.Router();


router.get('/add', function(req, res){

    if(req.session.level!=1){
        res.render('index', { title: 'Ibero App'});
    }

    res.render('addBranch', {title: "Agregar sucursal", levelUser: req.session.level});
});


router.get('/all', function(req, res){

    if(req.session.level!=1)
        res.render('index', { title: strings.MAIN_TITLE});

    let connection = mysql.createConnection(info_connection);
    connection.query(query.query_get_branchs, [req.session.id_business], (err, rows) => {

        if(err){
            connection.end((err) => console.error(err));
        }
        else{
            res.render('allBranch', {title: strings.ALL_BRANCHES, business: rows, levelUser: req.session.level});
        }
    });
});

router.get('/all/:id', (req, res) => {

    if(req.session.level!=0)
        res.render('index', { title: strings.MAIN_TITLE});

    let id_business = req.params.id;

    let connection = mysql.createConnection(info_connection);
    connection.query(query.query_get_branchs_by_id, [id_business], (err, rows) => {

        if(err)
            connection.end((err) => console.error(err));
        else
            res.render('allBranch', {title: strings.ALL_BRANCHES, business: rows, levelUser: req.session.level});

    });
});


router.get('/edit/:id', (req, res) => {
    res.render('branch', {title: strings.EDIT_BRANCH, levelUser: req.session.level, id_branch: req.params.id});
});

module.exports = router;