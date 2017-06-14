$(document).ready(function(){

    var egresados = 0;
    var ag=0;
    var m=0;
    var s=0;
    var i=0;
    var c=0;
    for (var j = business.length - 1; j >= 0; j--) {
        console.log(business[j].business_type);
        if(business[j].graduated == 1)
            egresados++;

        switch(business[j].business_type){
            case 'Mineras': m++; break;
            case 'Agropecuarias': ag++; break;
            case 'Servicio': s++; break;
            case 'Industria': i++; break;
            case 'Comercio': c++; break;
        }
    };

    Morris.Bar({
      element: 'bar-chart1',
      data: [
        { y: 'Agropecuarias', a: ag},
        { y: 'Mineras', a: m },
        { y: 'Servicio', a: s},
        { y: 'Industria', a: i},
        { y: 'Comercio', a: c}
      ],
      barColors: ['#9a8b7d'],
      xkey: 'y',
      ykeys: ['a'],
      labels: ['Valor', 'Series B'],
      yLabelFormat: function(y){ return y != Math.round(y)?'':y; }
    });


    Morris.Donut({
      element: 'donut-chart1',
      colors: ['#9a8b7d', '#ef4044' ],
      data: [
        {label: "Empresa Normal", value: (business.length-egresados)},
        {label: "Empresa de Egresados", value: egresados}
      ]
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
            $('#data-table-students').DataTable({
                responsive: true,
                dom: 'Bfrtip',
                buttons: [ 'excel', 'pdf', 'csv'],
                "oLanguage": esp
            });
});