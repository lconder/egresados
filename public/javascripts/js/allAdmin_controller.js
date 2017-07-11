function deleteAdmin(but){
	
	var id = but.id;
	
	object_post = {
		'id': id
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
			}else{
				swal('Ha ocurrido un error inesperado')
			}
		},
		contentType: "application/json",
		dataType: 'json'
	});
}