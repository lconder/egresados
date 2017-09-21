# **password**

##### Resetear el password de una empresa basado en su RFC.

* **URL**

  /password/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

    None
 
* **Data Params**
    
    **Required:**

    `rfc: String`  

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `updated: Int`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **upodated** se encuentra un entero si es 0 la actualización fallo si es 1 se realizó con éxito.
    
		```json
		{
			'error' : 0,
			'updated': 1
    }
        
* **Error Response:** 
    
    `error: Int`  
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al resetear el password."
        }
      ```

***