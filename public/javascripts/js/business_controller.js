function activate(but){
	var status = but.id;
	var id = but.name;
	var object_post;
	if(status==0){
		object_post = {
			"status": 1,
			"id": id
		};
	}else if(status==1){
		object_post = {
			"status": 0,
			"id": id
		};
	}
	$.ajax({
		type: 'POST',
		url: '/business/activate/',
		data: JSON.stringify(object_post),
		success: function(data) {
			if(data.error==0 && data.updated==true){
				swal({title:"Se ha modificado el Convenio", text:"Se ha actualizado el estado de este convenio.",type:"success"}).then(
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