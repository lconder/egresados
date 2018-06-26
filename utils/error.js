module.exports = {

	NO_ERROR: 200,
	ERROR_CLIENT: 400,
	ERROR_SERVER: 500,

	NO_BUSINESS_FOUND : "No se encontraron negocios",

	error(description) {
		custom = {
			error: 1,
			description: description
		}
		return custom
	}

}