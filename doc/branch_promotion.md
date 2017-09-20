# **Branch_promotion**

##### Obtener todas las sucursales en las que se encuentra una promoción.

* **URL**

  /branch_promotion/:id_promotion

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

	`id: Int`  
 
* **Data Params**
    
    **Required:**

    None

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `branchs: [  
    	{  
			address: String,  
			latitude: Float,  
			longitude: Float,  
			name: String,  
			graduated: Int  
    	}  
    ]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **branchs** se encuentra un arreglo de usuarios basados en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'branchs': [ 
            	{           	
					address: "11 Poniente 1234",  
					latitude: 19.0765,  
					longitude: -98,03258,  
					name: "2x1 en Bebidas",  
					graduated: 0
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
            'description': "Error al encontrar sucursales"
        }
      ```

***