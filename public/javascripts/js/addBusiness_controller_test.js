$.validate({

	lang: 'es',
	 modules : 'html5',
	onSuccess : function() {
		if(checkRFC($("#rfc").val())){
			console.log("POST DATA");
			postData()
		}else{
			swal("RFC no válido")
			console.log("RFC NO VALIDO")
		}
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
			"address" : address
		};
	console.log(business);

	$.ajax({
			type: 'POST',
			url: '/business/',
			data: JSON.stringify(business),
			beforeSend: function(){
				swal('Espere...');
				swal.showLoading();
			},
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

function checkRFC(rfc){

	const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
	var   validado = rfc.match(re);
	if(validado){
		return true;
	}else{
		return false;
	}

}

$('#rfc').change(function(){

    if (checkRFC($('#rfc').val()))  {
    	$("#rfcError").html("");
    }
    else{
    	$("#rfcError").css('color','red');
		$("#rfcError").html("Este R.F.C no es válido");
    }
})

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
