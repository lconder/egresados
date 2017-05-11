var qrcode = new QRCode("qrcode");
function makeQR(b){
	qrcode.clear();
	$('#myModal1').modal('toggle');
	qrcode.makeCode(b.id);
}

function deletePromotion(but){
	var status = but.name;
	var id = but.id;
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
		type: 'PUT',
		url: '/promotion/activate',
		data: JSON.stringify(object_post),
		success: function(data) {
			if(data.error==0 && data.updated==true){
				swal({title:"Se ha modificado la promoción.", text:"Se ha actualizado el estado de esta promoción.",type:"success"}).then(
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

$(document).ready(function() {
	var esp = {
		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
			"sFirst":    "Primero",
			"sLast":     "Último",
			"sNext":     "Siguiente",
			"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}
	};
	$('#data-table-promotions').DataTable({
		responsive: true,
		dom: 'Bfrtip',
		buttons: [ 'excel','csv','pdf'],
		"oLanguage": esp
	});
});