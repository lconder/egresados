# **credential**

##### Obtener los datos de un egresado a partir de su id.

* **URL**

  /login_web/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

    `id_student: Int`  
 
* **Data Params**
    
    **Required:**

    None

    **Optional:**
    
    None
        
* **Success Response:**

	`error: Int`  
	`student: 
	{
		name: String,
		lastname: String,
		second_lastname: String,
		mat: Int,
		photo: String,
		gender: Int,
		career: String,
		active: Int,
		email: String,
		street_number: String,
		suburb: String,
		postal_code: String,
		phone: String,
		mobile: String,
		business_name: String,
		business_type: String,
		position: String,
		day_start: Int,
		month_start: Int,
		year_start: Int`  
	}  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **student** se encuentra el egresado encontrado basado en el modelo anterior.
    
		```json
		{
			'error' : 0,
			'student': {
				name: "JUAN GUILLERMO",
				lastname: "ESPINOSA",
				second_lastname: "GARCIA",
				mat: 141000,
				photo: "/images/user.png",
				gender: 1,
				career: "MAESTRÍA EN ADMINISTRACIÓN DE LA EMPRESA INDUSTRIAL",
				active: 1,
				email: "prueba@test.com",
				street_number: "141 Poniente 1",
				suburb: "súr",
				postal_code: "72498",
				phone: "1234567890",
				mobile: "1234567890",
				business_name: "TéST",
				business_type: "Desconocido",
				position: "TéST",
				day_start: 14,
				month_start: 9,
				year_start: 2015
			}
		}
        
* **Error Response:** 
    
    `error: Int`  
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al iniciar sesión"
        }
      ```

***