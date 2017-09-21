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
            'promotion': {         	
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
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al obtener promoción"
        }
      ```

***

##### Consumir una promoción.

* **URL**

  /promotion/:id

* **Method:**

  `POST`
  
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
		modified: Boolean,
	}`    
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **promotion** se encuentra una bandera llamada modified que indica que la promoción ha sido consumida con éxito en este momento se actualiza el contador de esta promotion.
    
        ```json
        {
            'error' : 0,
            'promotion': {         	
				modified: true
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
            'description': "Error al obtener promoción"
        }
      ```

***

##### Activar o desactivar una promoción.

* **URL**

  /promotion/activate

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**

    None 
 
* **Data Params**
    
    **Required:**

    `id: Int`  
    `status: Int`  

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `updated: Boolean`    
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **updated** se encuentra una bandera que indica que el estado de la promoción ha sido actualizado con éxito.
    
        ```json
        {
            'error' : 0,
            'updated': true
      }
        
* **Error Response:** 
    
    `error: Int`  
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al actualizar estado de  promoción"
        }
      ```

***