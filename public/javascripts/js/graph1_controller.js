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

$('#data-table-students').DataTable({
    responsive: true,
    dom: 'Bfrtip',
    buttons: [ 'excel', 'pdf'],
    "oLanguage": esp
});

$('a').click(function(){

    //alert(this.id)
    $('#promos tbody').empty();
    $.ajax({
        url: '/student_promotion/'+this.id,
        success: function(response){
            console.log(response);
            $.each(response, function(i, item){
                $('#promos tbody').append(
                        '<tr><td>'+item.date+'</td><td>'+item.description+'</td><td>'+item.name+'</td><td>'+item.address+'</td></tr>'
                    )
                
            });
        }
    });

});