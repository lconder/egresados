var band;

function changeStatus(value){
	band = value;
}

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


function resetPass(){

	var rfc = $("#reset").val();

	if($.trim(rfc)==0){
		swal({title:"Ingresa un RFC para buscar", text:"Es necesario ingresar un RFC.",type:"error"})
	}else{
		$.ajax({
			type: 'POST',
			url: '/password/',
			data: JSON.stringify({'rfc' : rfc}),
			success: function(data) {
				console.log(data)
				if(data.error==0 && data.updated==1){
					swal({title:"Se ha modificado el password", text:"Se ha enviado un correo con el nuevo password.",type:"success"})
					.then(
						function(result) {
							location.reload();
						});
				}else{
					swal({title:"No se ha encontrado el usuario", text:"Verifica que el RFC ingresado sea correcto.",type:"error"})
				}
			},
			contentType: "application/json",
			dataType: 'json'
		});
	}

}

$( '#submit' ).click(function(){ submitForm() });

$( '#password_reset' ).click(function(){ resetPass() });


document.onkeydown = function (e) {
	e = e || window.event
    if (e.keyCode == '13') {
    	if(band==0){
    		submitForm();
    	}
        else{
        	resetPass();
        }
    }
}

$( document ).ready(function() {
	band = 0;
	if(files==1){
		swal({title:"Se ha agregado tu convenio", text:"Hemos enviado un correo con tu contraseña, ahora puedes iniciar sesión, recuerda que tu usuario es tu RFC.",type:"success"})
	}
});



function openHelp(){

	swal({
		title: '<h3>Ayuda</h3>',
		type: 'info',
		html:
			"<br><h4>Si eres un usuario registrado</h4>" +
			"<p>Ingresa con tu <b>RFC</b> y la contraseña que se te envío vía correo electrónico, si has olvidado tu contraseña puedes recuperarla en el botón que tiene el signo de interrogación.</p>" +
			"<br><h4>Si aún no te has registrado</h4> " +
			"<p>Puedes hacerlo dando click aquí: <a href='/business/add' target='_blank' >Registrar Convenio</a>. </p>",
		showCloseButton: true,
		confirmButtonText:
			'<i class="fa fa-thumbs-up"></i> ¡Entendido!'
	})

	return false;
}