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

function deleteAdmin(but){
	
	var id = but.id;
	
	object_post = {
		"id": id
	};


	$.ajax({
		type: 'PUT',
		url: '/admin/',
		data: JSON.stringify(object_post),
		success: function(data) {
			if(data.error==0 && data.updated==true){
				swal({title:"Se ha eliminado el administrador.", text:"Se ha actualizado el estado de esta sección.",type:"success"}).then(
					function(result) {
						location.reload();
					});
			}
			//swal("Convenio no activado", "El usuario y password con el que se intenta acceder se encuentra actualmente desactivado.")
		},
		contentType: "application/json",
		dataType: 'json'
	});
}
