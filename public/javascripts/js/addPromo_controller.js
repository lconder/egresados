function validateDate(){


	let date_created = new Date(formatDate($("#created_at").val()));
	let date_expired = new Date(formatDate($("#expired_date").val()));
	let today = new Date();
	today.setHours(0,0,0,0);


    let diff_days = moment(date_expired).diff(date_created, 'days');

    if(diff_days > 0){

		let diff_days_created = moment(date_created).diff(today, 'days');
		let diff_days_expired = moment(today).diff(date_expired, 'days');

		if(diff_days_created>=0 && diff_days_expired<=0){
			postData();
		} else {
            swal({type:'error',title:'Verifica las fechas'});
		}
	}else{
        swal({type:'error',title:'La fecha de fin deber ser mayor a la de inicio.'});
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
		

		let promo = {
			name,
			expired_date,
			created_at,
			promo_description,
			branch
		};
		
		$.ajax({
				type: 'POST',
				url: '/promotion_business/',
				data: JSON.stringify(promo),
				success: function(data) {
					console.log(data);
					if(data.error == 0){
						swal({title:'Promoción dada de alta de manera exitosa.', text:'Ya puedes visualizar su información en el apartado -Ver todas las promociones-.',type:'success'})
							.then(() => location.reload());
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

function formatDate(date){
    let array_date = date.split('/');
    return `${array_date[2]}/${array_date[1]}/${array_date[0]}`;
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
