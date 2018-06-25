var express = require('express');
var request = require('request');
var router = express.Router();


router.get('/', function(req, res, next){

	getTypes()
	.then(bt => {
		res.json(bt)
	})
	.catch(error => {
		res.json(error)
	})

});


function getTypes(){

	
	return new Promise(function (resolve, reject){


		request(url+'/CatalogosDatosLaborales?k='+key, function(error, response, body){
			

			business_types = JSON.parse(body);
			bt = business_types.CatalogosDatosLaboralesResult[0].CatalogosDatosLaborales
			clean = []
			if(!error && response.statusCode == 200)
			{
				for (var i = bt.length - 1; i >= 0; i--) {
					var temp = {id: bt[i].cveGiro, name: bt[i].nombreGiro}
					clean.push(temp)
				};
				var data = {
					'error': 0,
					'business_type': clean
				}
				
				resolve(data)
			}else{
				console.log("Error del servidor")
				reject({ 'error':1, 'desc':"Error del servidor" })
			}

		})

	});
}

module.exports = router;