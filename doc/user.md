# **Users**

##### Obtener todos los usuarios (los cuales pueden ser superadministradores o administradores).

* **URL**

  /users/

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
    `users: [  
    	{  
			id: Int,  
			user: String,  
			nickname: String,  
			admin: Int,  
			superadmin: Int  
    	}  
    ]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **users** se encuentra un arreglo de usuarios basados en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'users': [ 
            	{           	
					id: 1,  
					user: "admin",  
					nickname: "admin",  
					admin: 1,  
					superadmin: 0 
				}
            ]
      }
        
* **Error Response:** 
    
    `error: Int`  
    `users: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **users** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'users': "Error al encontrar usuarios"
        }
      ```

***

##### Obtener un usuario por su id.

* **URL**

  /users/:id

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
    `users: 
    	{  
			id: Int,  
			user: String,    
			nickname: String,    
			admin: Int,    
			superadmin: Int    
    	}`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **user** se encuentra el usuario encontrado basado en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'user': 
            	{           	
					id: 1,  
					user: "admin",  
					nickname: "admin",  
					admin: 1,  
					superadmin: 0 
				}
      }
        
* **Error Response:** 
    
    `error: Int`  
    `user: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **users** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'users': "Error al encontrar usuario"
        }
      ```

***