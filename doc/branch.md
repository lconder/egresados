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
            'business': "Error al encontrar sucursales"
        }
      ```

***

##### Creación de un nuevo Branch (Sucursal)

* **URL**

  /branch/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

    None
 
* **Data Params**
    
    **Required:**

    `name: String`  
    `latitude: Float`  
    `longitude: Float`  
    `address: String`  
    `business_id: Int`  

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `branch: [  
    	{  
			created: Boolean,  
			id: Int
    	}  
    ]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **branch** se encuentra una bandera llamada created y el id insertado en la base de datos.
    
        ```json
        {
            'error' : 0,
            'branch': [ 
            {           	
				created: true,
				id: 1
			}
		]
      }
        
* **Error Response:** 
    
    `error: Int`  
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al crear sucursal"
        }
      ```

***