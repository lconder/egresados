function submitForm(){

	var user = $("#user").val();
	var password = $("#password").val();

	if($.trim(user).length==0 || $.trim(password).length==0){
		console.log("por favor,  llena todos los campos");
		$('#alert').html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'>&times;</button>Por favor llena todos los campos</div>");
	}else{
		$('#alert').empty();
		$.ajax({
			type: 'POST',
			url: '/login_web',
			data: JSON.stringify({user: user, password: password}),
			success: function(data) {
				console.log(data)
				if(data.error == 1){
					if(data.desc == "no se ha encontrado ningún usuario"){
						$('#alert').html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'>&times;</button>No existe el usuario o el password es incorrecto, verifica.</div>");
					}else if(data.desc == "error servidor"){
						$('#alert').html("<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert'>&times;</button>Ha ocurrido un error intentalo de nuevo, por favor.</div>");
					}
				}
				else if(data.error == 0)
				{
					if(data.active==0){
						swal("Convenio no activado", "El usuario y password con el que se intenta acceder se encuentra actualmente desactivado.")
					}else{
						$('#alert').html("<div class='alert alert-success alert-dismissable'><button type='button' class='close' data-dismiss='alert'>&times;</button>Inicio de sesión exitoso.</div>");
						if(data.level==0){
							window.location = '/dashboard';
						}else{
							if(data.level==1){
								console.log("session business");
								window.location = '/settings';
							}
						}
					}
				}
			},
			contentType: "application/json",
			dataType: 'json'
		});
	}

	return false
}

$( '#submit' ).click(function() {submitForm()});

document.onkeydown = function () {
    if (window.event.keyCode == '13') {
        submitForm();
    }
}