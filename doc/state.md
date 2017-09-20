# **State**

##### Obtener todos los negocios en un estado.

* **URL**

  /state/:state

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

    `state: Int`
 
* **Data Params**
    
    **Required:**

    None

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `business: [  
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
			attendant_id: Int,
			promotions: [ ] 
    	}  
    ]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **business** se encuentra un arreglo de empresas basados en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'business': [ 
            	{           	
					id: 74,
					created_at: "2017-08-31T05:00:00.000Z",
					name: "FULL STACK",
					rfc: "FST1707085E1",
					password: "8d9100ddc0b558e44a1d5eae485619fe31bcce20",
					phone: "2221026541",
					facebook: "",
					twitter: "",
					website: "",
					graduated: 0,
					discount_description: "SOFTWARE ",
					size: "Microempresa",
					business_type: "Servicio",
					categorie: 16,
					logo: "files_business/logo_74.jpeg",
					act: "files_business/act_74.png",
					credential: "files_business/credential_74.png",
					voucher: "files_business/voucher_74.png",
					street: "TORRES",
					external_number: "204",
					internal_number: "",
					postal_code: "72498",
					suburb: "LOMAS DEL SUR",
					city: "PUEBLA",
					state: 21,
					active: 1,
					user_id: 1,
					attendant_id: 74,
					promotions: [ ] 
				}
            ]
      }
        
* **Error Response:** 
    
    `error: Int`  
    `business: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **business** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'business': "Error al encontrar usuarios"
        }
      ```

***