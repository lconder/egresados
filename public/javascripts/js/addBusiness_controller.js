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
	var band = false;

	if($.trim(business_name).length==0){
		$("#business_nameError").css('color','red');
		$("#business_nameError").html("El nombre de la empresa es requerido");
	}else{
		$("#business_nameError").html("");
	}

	if($.trim(rfc).length==0){
		$("#rfcError").css('color','red');
		$("#rfcError").html("El R.F.C. de la empresa es requerido");
	}else{
		$("#rfcError").html("");
	}

	if(isValidRFC(rfc)==false){
		$("#rfcError").css('color','red');
		$("#rfcError").html("Ingresa un RFC válido (XEX010101000)");
	}else{
		$("#rfcError").html("");
	}


	if($.trim(phone).length==0){
		$("#phoneError").css('color','red');
		$("#phoneError").html("El teléfono es requerido");
	}else{
		$("#phoneError").html("");
	}

	if(isValidPhone(phone)==false){
		$("#phoneError").css('color','red');
		$("#phoneError").html("Ingresa un número válido (10 dígitos sin espacios)");
	}else{
		$("#phoneError").html("");
	}

	if($.trim(external_number).length==0){
		$("#external_numberError").css('color','red');
		$("#external_numberError").html("El número exterior es requerido");
	}else{
		$("#external_numberError").html("");
	}

	if($.trim(street).length==0){
		$("#streetError").css('color','red');
		$("#streetError").html("La calle es requerida");
	}else{
		$("#streetError").html("");
	}

	if($.trim(postal_code).length==0){
		$("#postal_codeError").css('color','red');
		$("#postal_codeError").html("El código postal es requerido");
	}else{
		$("#postal_codeError").html("");
	}

	if(isValidPC(postal_code)==false){
		$("#postal_codeError").css('color','red');
		$("#postal_codeError").html("Ingresa un código postal válido (5 dígitos y sólo números)");
	}else{
		$("#postal_codeError").html("");
	}

	if($.trim(suburb).length==0){
		$("#suburbError").css('color','red');
		$("#suburbError").html("La colonia es requerida");
	}else{
		$("#suburbError").html("");
	}

	if($.trim(city).length==0){
		$("#cityError").css('color','red');
		$("#cityError").html("La ciudad es requerida");
	}else{
		$("#cityError").html("");
	}

	if(state==0){
		$("#stateError").css('color','red');
		$("#stateError").html("El estado es requerido");
	}else{
		$("#stateError").html("");
	}

	if($.trim(discount_description).length==0){
		$("#discount_descriptionError").css('color','red');
		$("#discount_descriptionError").html("Por favor, escribe una breve descripción");
	}else{
		$("#discount_descriptionError").html("");
	}

	if($.trim(attendant_name).length==0){
		$("#attendant_nameError").css('color','red');
		$("#attendant_nameError").html("El nombre del encargado es necesario");
	}else{
		$("#attendant_nameError").html("");
	}

	if($.trim(attendant_lastname).length==0){		
		$("#attendant_lastnameError").css('color','red');
		$("#attendant_lastnameError").html("El apellido paterno del encargado es necesario");
	}else{
		$("#attendant_lastnameError").html("");
	}

	if($.trim(attendant_second_lastname).length==0){
		$("#attendant_second_lastnameError").css('color','red');
		$("#attendant_second_lastnameError").html("El apellido materno del encargado es necesario");
	}else{
		$("#attendant_second_lastnameError").html("");
	}

	if($.trim(email).length==0){
		$("#emailError").css('color','red');
		$("#emailError").html("El email del encargado es necesario");
	}else{
		$("#emailError").html("");
	}

	if(isValidEmailAddress(email)==false){
		$("#emailError").css('color','red');
		$("#emailError").html("Ingresa un email válido");
	}else{
		$("#emailError").html("");
	}

	if($.trim(mobile).length==0){
		$("#mobileError").css('color','red');
		$("#mobileError").html("El celular del encargado es necesario");
	}else{
		$("#mobileError").html("");
	}

	if(isValidPhone(mobile)==false){
		$("#mobileError").css('color','red');
		$("#mobileError").html("Ingresa un celular válido (10 dígitos sin espacios)");
	}else{		
		$("#mobileError").html("");
	}

	if($.trim(address).length==0){
		$("#addressError").css('color','red');
		$("#addressError").html("La dirección del encargado es necesaria");
	}else{
		$("#addressError").html("");
	}
	
	if(size==0){
		$("#sizeError").css('color','red');
		$("#sizeError").html("Selecciona una opcion válida");
	}else{
		$("#sizeError").html("");
	}

	if(business_type==0){
		$("#business_typeError").css('color','red');
		$("#business_typeError").html("Selecciona una opcion válida");
	}else{
		$("#business_typeError").html("");
	}

	if($.trim(business_name).length==0 || $.trim(rfc).length==0 || $.trim(phone).length==0 || 
		$.trim(street).length==0 || $.trim(external_number).length==0 || $.trim(postal_code).length==0 ||
		 $.trim(discount_description).length==0 || $.trim(attendant_name).length==0 ||
		  $.trim(attendant_lastname).length==0 || $.trim(attendant_lastname).length==0 ||
		   $.trim(attendant_second_lastname).length==0 || $.trim(email).length==0 || $.trim(mobile).length==0 || 
		    $.trim(address).length==0  || !isValidPhone(mobile) || !isValidPC(postal_code) || !isValidPhone(phone) || !isValidEmailAddress(email) ||
		  	 size==0 || business_type==0 || $.trim(suburb).length==0 || state==0 || $.trim(city).length==0){
		band = false;
	}else{
		band=true;
	}


	if(band){
		console.log("band true");
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
			"address" : address
		};
		console.log(business);

		$.ajax({
			type: 'POST',
			url: '/business/',
			data: JSON.stringify(business),
			success: function(data) {
				console.log(data);
				if(data.error == 0 && data.business.created == true){
					swal({title:"Negocio dado de alta de manera exitosa.", text:"Ahora procederemos a la carga de tus archivos.",type:"success"}).then(
					function(result) {
						window.location.href = "/files";
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

		/*rfc = {'rfc': rfc}

		$.ajax({
			type: 'POST',
			url: '/rfc/',
			data: JSON.stringify(rfc),
			success: function(data) {
				console.log(data);
				if(data.error == 0 && data.count == 0){

					
					
				}else{
					swal("Este RFC ya se encuentra registrado")
				}
			},
			contentType: "application/json",
			dataType: 'json'
		});*/
		

		

	}else{
		console.log("band is false");
	}
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

function isValidPC(postal_code){
	var pattern = /^([0-9])*$/;
	if(postal_code.length==5){
		return pattern.test(postal_code)
	}else{
		return false
	}

}



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
	swal({
		title: '¡Bienvenido!',
		html: '<h5>Este es el registro de un nuevo negocio, te invitamos a tener preparados los siguientes documentos:</h5><br><br>-Logo<br><br>-Acta constitutiva de la empresa<br><br>-Comprobante de domicilio<br><br>-Copia de IFE del encargado<br><br><h5>En formato PNG o JPG. </h5>',
		imageUrl: '/images/logo.jpg',
		imageWidth: 300,
		imageHeight: 115,
		animation: false
	})


	$("#business_type").change(function(){
		var str = "";
		$("#business_type option:selected").each(function(){
			str += $(this).text()+"";
		});
		fillCategories(str);
	});
});