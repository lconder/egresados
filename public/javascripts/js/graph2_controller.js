$(document).ready(function(){

    var graduated_count = 0;
    var not_graduated_count = 0;
    var ag=0, m=0;
    var s=0;
    var n=0;
    var c=0; 

    for(var i=0; i<data.length; i++){
        switch(data[i].graduated){
            case 1: graduated_count+=data[i].count; break;
            case 0: not_graduated_count+=data[i].count; break;
            default: break;
        }
        console.log(data[i].business_type);
        switch(data[i].business_type){
            case 'Agropecuarias': ag+=data[i].count; break;
            case 'Mineras': m+=data[i].count; break;
            case 'Servicio': s+=data[i].count; break;
            case 'Industria': n+=data[i].count; break;
            case 'Comercio': c+=data[i].count; break;
            default: break;
        }
    }

    console.log(graduated_count, not_graduated_count);
    Morris.Bar({
      element: 'bar-chart1',
      data: [
        { y: 'Visitas a empresas de Egresados', a: graduated_count},
        { y: 'Visitas a empresas normales', a: not_graduated_count }
      ],
      barColors: ['#9a8b7d'],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Valor', 'Series B']
    });

     Morris.Bar({
      element: 'bar-chart2',
       data: [
        { y: 'Agropecuarias', a: ag},
        { y: 'Mineras', a: m },
        { y: 'Servicio', a: s},
        { y: 'Industria', a: n},
        { y: 'Comercio', a: c}
      ],
      barColors: ['#9a8b7d'],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Valor', 'Series B']
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
            $('#data-table-promos').DataTable({
                responsive: true,
                dom: 'Bfrtip',
                buttons: [ 'excel'],
                "oLanguage": esp
            });
});