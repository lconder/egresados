# **Branch**

##### Obtener todos los negocios asociados a su plataforma con sus respectivas sucursales.

* **URL**

  /branch/

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
    `business: [
    	{
			name: String,
			graduated: Int,
			logo: String,
			latitude: Float,
			longitude: Float,
			address: String,
			business_id: Int
    	}
    ]`
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **business** se encuentra una arreglo de sucursales basados en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'business': [ 
            	{           	
					name: "IQBC",
					graduated: 1,
					logo: "files_business/logo_74.jpg",
					latitude: 19.05467,
					longitude: -98.01465,
					address: "11 sur 12904",
					business_id: 74
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
            'agreements': "Error al encontrar sucursales"
        }
      ```

***