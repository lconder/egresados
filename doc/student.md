# **Student**

##### Obtener todos los egresados.

* **URL**

  /student/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

    None
 
* **Data Params**
    
    **Required:**

    None

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `students: [  
    	{  
			id: Int,
			photo: String,
			gender: Int,
			mat: Int,
			career: String,
			name: String,
			lastname: String,
			second_lastname: String,
			email: String,
			phone: String,
			mobile: String,
			street_number: String,
			suburb: String,
			state: String,
			postal_code: String,
			created_at: Date,
			last_login: Date,
			employed: Int,
			business_name: String,
			business_type: String,
			position: String,
			day_start: Int,
			month_start: Int,
			year_start: Int,
			business_size: String,
			active: Int,
			expired_at: Date" 
    	}  
    ]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **students** se encuentra un arreglo de egresados basados en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'students': [ 
            	{           	
					id: 1,
					photo: "/images/user.png",
					gender: 1,
					mat: 141000,
					career: "MAESTRÍA EN ADMINISTRACIÓN DE LA EMPRESA INDUSTRIAL",
					name: "JUAN GUILLERMO",
					lastname: "ESPINOSA",
					second_lastname: "GARCIA",
					email: "prueba@test.com",
					phone: "1234567890",
					mobile: "1234567890",
					street_number: "141 Poniente 1",
					suburb: "súr",
					state: "174",
					postal_code: "72498",
					created_at: "2017-09-12T11:32:30.000Z",
					last_login: "2017-09-12T11:32:30.000Z",
					employed: 1,
					business_name: "TéST",
					business_type: "Servicios",
					position: "TéST",
					day_start: 14,
					month_start: 9,
					year_start: 2015,
					active: 1,
					expired_at: "2018-09-12T05:00:00.000Z" 
				}
            ]
      }
        
* **Error Response:** 
    
    `error: Int`  
    `students: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **students** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'students': "Error al encontrar egresados"
        }
      ```

***

##### Carga la vista que contiene a todos los administradores creados.

* **URL**

  /student/all

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    None
 
* **Data Params**
    
    **Required:**
    
    None

    **Optional:**
    None
        
* **Success Response:**

    Cargará una vista, la cuál contiene una tabla con los egresados dados de alta, y ciertas opciones.
        
* **Error Response:**

    Esto ocurre cuando la petición encontró algún un error  en este momento cargará la vista principal de la plataforma .