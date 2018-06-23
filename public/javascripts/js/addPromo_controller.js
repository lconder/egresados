function validateDate(){

	var expired_date = $("#expired_date").val();
	var created_at = $("#created_at").val();

	var date_created = created_at.split("/");
	var date_expired = expired_date.split("/");
	

	dc = new Date(date_created[2],date_created[1]-1,date_created[0])
	de = new Date(date_expired[2],date_expired[1]-1,date_expired[0])
	today = new Date()

	if((dc.getTime() >= today.getTime()))
	{
		if((de.getTime() >= today.getTime()))
		{
			
			if(de.getTime() >= dc.getTime()){
				postData();
				console.log("true");
			}
			else{
				swal("La fecha de fin no es válida")
			}
		}else{
			swal("La fecha de fin no es válida")
		}
	}else{
		console.log("fecha invalida 1");
		swal("La fecha de inicio no es válida")
	}
}

function postData(){
	var	name = $("#name").val();
	var expired_date = $("#expired_date").val();
	var created_at = $("#created_at").val();
	var promo_description = $("#promo_description").val();
	var branch = [];
	


	for(var i=0; i<business.length; i++){
		if($('#'+business[i].id).is(":checked")){
			branch.push(business[i].id);
		}
	}

	if(branch.length!=0){
		

		var promo = {
			"name": name,
			"expired_date": expired_date,
			"created_at": created_at,
			"promo_description": promo_description,
			"branch": branch
		};
		
		$.ajax({
				type: 'POST',
				url: '/promotion_business/',
				data: JSON.stringify(promo),
				success: function(data) {
					console.log(data);
					if(data.error == 0){
						swal({title:"Promoción dada de alta de manera exitosa.", text:"Ya puedes visualizar su información en el apartado -Ver todas las promociones-.",type:"success"}).then(
						function(result) {
							location.reload();
						});
					}else{
						swal('Error','Hubo un error al procesar la petición','error');
					}
				},
				contentType: "application/json",
				dataType: 'json'
			});
	}else{
		swal('Error','Selecciona al menos una sucursal para activar esta Promoción','error');
	}
	
	
}

$(document).ready(function() {

	$(function () {
		$('#created_at').datetimepicker({minDate: moment()});
	});

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
		"oLanguage": esp
	});

			

});
