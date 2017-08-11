$.validate({
	form : '#form_files',
	modules: 'file',
	lang: 'es',
	onSuccess : function() {
		console.log("Válido")
	}
});