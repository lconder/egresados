# **Agreement**

##### Obtener todos los convenios.

* **URL**

  /agreement/

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
    `agreements: [
    	{
    		id: Int,
			created_at: Date,
			name: String,
			rfc: String,
			phone: String,
			facebook: String,
			twitter: String,
			website: String,
			graduated: Int,
			discount_description: String,
			size: String,
			business_type: String,
			categorie: Int,
			logo: String,
			act: String,
			credential: String,
			voucher: String,
			street: String,
			external_number: String,
			internal_number: String,
			postal_code: String,
			suburb: String,
			city: String,
			state: Int,
			active: Int,
			user_id: Int,
			attendant_id: Int
    	}
    ]`
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **agreements** se encuentra una arreglo de convenios basados en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'agreements': [
            	id: 74,
				created_at: "2017-08-31T05:00:00.000Z",
				name: "IQBC",
				rfc: "PASP600101E36",
				password: "b1489c045eca30d0bc4d1951bf37985de5ea0fee",
				phone: "2221028765",
				facebook: "",
				twitter: "",
				website: "",
				graduated: 1,
				discount_description: "DESCRIPCION DEL TEST",
				size: "Microempresa",
				business_type: "Industria",
				categorie: 17,
				logo: "files_business/logo_74.jpg",
				act: "files_business/act_74.jpg",
				credential: "files_business/credential_74.jpg",
				voucher: "files_business/voucher_74.jpg",
				street: "11 SUR",
				external_number: "1",
				internal_number: "",
				postal_code: "72000",
				suburb: "L",
				city: "PUEBLA",
				state: 21,
				active: 1,
				user_id: 1,
				attendant_id: 74
            ]
      }
        
* **Error Response:** 
    
    `error: Int`
    `agreements: String`
    `updated: Boolean`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **agreements** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'agreements': "Error al eliminar un administrador",
            'updated': false
        }
      ```

***

##### Carga la vista que contiene a todos los convenios.

* **URL**

  /agreement/all

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

    Cargará una vista, la cuál contiene una tabla con los convenios dados de alta, y ciertas opciones.
        
* **Error Response:**

    Esto ocurre cuando la petición encontró algún un error  en este momento cargará la vista principal de la plataforma .