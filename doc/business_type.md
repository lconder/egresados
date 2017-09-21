# **business_type**

##### Obtener los giros de negocios.

* **URL**

  /business_type/

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
    `business_type: [{id: Int, name: String}]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **business_type** se encuentra un arreglo de objetos basados en el modelo anteriormente mencionado.
    
		```json
		{
			'error' : 0,
			'business_type': [
				{
					id: 99,
					name: "Comercio"
				},
				{
					id: 98,
					name: "Industria"
				},
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
            'description': "Error al obtener los giros de negocios"
        }
      ```

***