var map;
var latitude;
var longitude;

$.validate({
	form : '#form_branch',
	lang: 'es',
	onSuccess : function() {
		postData()
		return false;
	}
});

function addMarker(lati, longi){
	map.addMarker({
		lat: lati,
		lng: longi
	});
}

$(document).ready(function(){
	map = new GMaps({
		div: '#map',
		zoom: 15,
		lat: 19.021626,
		lng: -98.242301,
		click: function(e){
			latitude = e.latLng.lat();
			longitude = e.latLng.lng();
			newMap(latitude, longitude);
			getAddressReverse(latitude, longitude);
		}
	});
});

$('#address').change(function(e){
	getAddress();
});


$('#icon-info').addClass('animated wobble');

$('#icon-info').click(function(){
	swal({
		title: '<b>Sucursal Única</b>',
		type: 'info',
		html:
			'Recuerda ingresar todos tus puntos de venta para que aparezcan en nuestra App',
		showCloseButton: true
	})
})

function newMap(lat, lng){
	console.log(lat,lng);
	map = new GMaps({
		div: '#map',
		zoom: 15,
		lat: lat,
		lng: lng,
		click: function(e){
			latitude = e.latLng.lat();
			longitude = e.latLng.lng();
			newMap(latitude, longitude);
			getAddressReverse(latitude, longitude);
		}
	});
	addMarker(lat, lng);
}

function getAddress(){
	GMaps.geocode({
		address: $('#address').val(),
		callback: function(results, status){
			if(status=='OK'){
				var latlng = results[0].geometry.location;
				map.setCenter(latlng.lat(), latlng.lng());
			}
		}
	});
}

function getAddressReverse(lt, ln){
	var send = {
		"lat": lt,
		"lng":ln
	};

	$.ajax({
			type: 'POST',
			url: '/branch/address/',
			data: JSON.stringify(send),
			success: function(data) {
				$('#address_d').val(data.address)
			},
			contentType: "application/json",
			dataType: 'json'
		});
}

function postData(){
	var address = $('#address_d').val();
	var name = $('#name').val();
	console.log(address, name, latitude, longitude);

	var branch = {
		"name": name,
		"address": address,
		"latitude":latitude,
		"longitude":longitude
	};
	$.ajax({
		type: 'POST',
		url: '/branch/',
		data: JSON.stringify(branch),
		success: function(data) {
			swal({title:"Sucursal dada de alta de manera exitosa.", text:"Ya puedes visualizarla en el apartado<br> -Ver todas las sucursales-.",type:"success"}).then(
					function(result) {
						location.reload();
					});	
		},
		contentType: "application/json",
		dataType: 'json'
	});

}