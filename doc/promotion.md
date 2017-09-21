# **promotion**

##### Obtener una promoción y las sucursales en las que se encuentra vigente.

* **URL**

  /promotion/:id

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
    `promotion:{
    	branch: String,
    	branch_address: String,
    	latitude: Float,
    	longitude: Float,
    	count: Int,
    	active: Int,
    	promo: String,
    	description: String
	}`    
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **promotion** se encuentra el objeto encontrado basado en el modelo anterior.
    
        ```json
        {
            'error' : 0,
            'promo': {         	
				branch: "Test",
		    	branch_address: "Calle siempre viva 123",
		    	latitude: 19.0765,
		    	longitude: -98.16754,
		    	count: 23,
		    	active: 1,
		    	promo: "2X1 en bebidas nacionales",
		    	description: "A partir de las 5 p.m."		
			}
      }
        
* **Error Response:** 
    
    `error: Int`  
    `business: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al obtener promoción"
        }
      ```

***