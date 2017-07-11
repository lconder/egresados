$.validate({
	form : '#form_admin',
	modules : 'security',
	lang: 'es',
	onSuccess : function() {
		postData();
		return false;
	}
});

function postData(){

	var name = $("#name").val();
	var password = $("#password").val();


	var admin = {
		'name' : name,
		'password' : password
	}

	$.ajax({
			type: 'POST',
			url: '/admin/',
			data: JSON.stringify(admin),
			beforeSend: function(){
				swal('Espere...');
				swal.showLoading();
			},
			success: function(data) {
				console.log(data);
				if(data.error == 0 && data.admin.created == true){
					swal({title:"Admin dado de alta de manera exitosa.", text:"Ya puedes visualizarlo en el panel de administradores.",type:"success"}).then(
					function(result) {
						window.location.href = "/admin/";
					});
				}else{
					swal("Ocurrió un error inesperado")
				}
			},
			contentType: "application/json",
			dataType: 'json'
		});

}

function deleteAdmin(b){

}