$.validate({
	lang: 'es',
	onSuccess : function() {
		postData();
		return false;
	}
});

function postData(){

	var	business_name = $("#business_name").val();
	var	rfc = $("#rfc").val();
	var	phone = $("#phone").val();
	var	street = $("#street").val();
	var	external_number = $("#external_number").val();
	var	internal_number = $("#internal_number").val();
	var	postal_code = $("#postal_code").val();
	var	suburb = $("#suburb").val();
	var	city = $("#city").val();
	var	state = $("#state").val();
	var	facebook = $("#facebook").val();
	var	twitter = $("#twitter").val();
	var website = $("#website").val();
	var graduated = $('#graduated').is(':checked');
	var business_type = $("#business_type").val();
	var categorie = $("#categorie").val();
	var size = $("#size").val();
	var discount_description = $("#discount_description").val();
	var attendant_name = $("#attendant_name").val();
	var attendant_lastname = $("#attendant_lastname").val();
	var attendant_second_lastname = $("#attendant_second_lastname").val();
	var email = $("#email").val();
	var mobile = $("#mobile").val();
	var address = $("#address").val();
	var id_business = $("#id_business").val();
	var id_attendant = $("#id_attendant").val();
	var password = $("#password").val();
	var band = false;

	var business = {
			"business_name" : business_name,
			"rfc" : rfc,
			"phone" : phone,
			"street" : street,
			"external_number": external_number,
			"internal_number" : internal_number,
			"postal_code" : postal_code,
			"suburb" : suburb,
			"state" : state,
			"city" : city,
			"facebook": facebook,
			"twitter" : twitter,
			"website" : website,
			"graduated" : graduated,
			"business_type" : business_type,
			"categorie" : categorie,
			"size" : size,
			"discount_description" : discount_description,
			"attendant_name" : attendant_name,
			"attendant_lastname" : attendant_lastname,
			"attendant_second_lastname" : attendant_second_lastname,
			"email" : email,
			"mobile" : mobile,
			"address" : address,
			"id_business" : id_business,
			"id_attendant" : id_attendant
		};
		console.log(business);


	if($.trim(password).length!=0){

		console.log("Se actualizará el password")
		var updatePass = {
			'password': password,
			'id_business': id_business
		}

		$.ajax({
			type: 'PUT',
			url: '/settings/password/',
			data: JSON.stringify(updatePass),
			beforeSend: function(){
				swal('Espere...');
				swal.showLoading();
			},
			success: function(data) {
				console.log(data);
			},
			contentType: "application/json",
			dataType: 'json'
		});
	}



	$.ajax({
			type: 'PUT',
			url: '/settings/',
			data: JSON.stringify(business),
			beforeSend: function(){
				swal('Espere...');
				swal.showLoading();
			},
			success: function(data) {
				console.log(data);
				if(data.error == 0 && data.updated == true){
					swal({title:"Negocio editado de manera exitosa.", text:"Se han modificado tus datos con éxito.",type:"success"}).then(
					function(result) {
						window.location.href = "/settings";
					});
				}else{
					if(data.error==1 && data.code_error==1){
						swal("El RFC ingresado ya existe")
					}
				}
			},
			contentType: "application/json",
			dataType: 'json'
		});


	

}


function isValidEmailAddress(emailAddress) {
			var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
			return pattern.test(emailAddress);
};

function isValidRFC(rfc){
	var pattern = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/;
	return pattern.test(rfc);
}

function isValidPhone(phone) {
	var pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
	return pattern.test(phone);
};



function clearForm(){
	console.log("Clear Form");
}

function getDataCategories(id){
	
	$.getJSON("/categories/"+id, function(data) {
		$('#categorie').empty();
		console.log(data);
		$.each(data, function(){
				$("#categorie").append('<option value="'+ this.id +'">'+ this.name +'</option>')
			});
		$('#categorie').selectpicker('refresh');
	});
}

function fillCategories(business_type){
	switch(business_type){
		case "Agropecuarias":
			getDataCategories(4);
			break;
		case "Mineras":
			getDataCategories(5);
			break;
		case "Servicio":
			getDataCategories(1);
			break;
		case "Industria":
			getDataCategories(2);
			break;
		case "Comercio":
			getDataCategories(3);
			break;
		default: break;
	}
}

$(document).ready(function(){


	$("#business_type").change(function(){
		var str = "";
		$("#business_type option:selected").each(function(){
			str += $(this).text()+"";
		});
		fillCategories(str);
	});
});