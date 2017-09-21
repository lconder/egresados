# **login_web**

##### Iniciar sesión desde la plataforma web, como administrador, superadministrador o como negocio registrado.

* **URL**

  /login_web/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

    None
 
* **Data Params**
    
    **Required:**

    `user: String`  
    `password: String`  

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `level: Int`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **level** se encontrará el nivel de usuario dependiendo de si es un Administrador, Superadministrador o un negocio, además en la sesión se guardará el id del usuario que inicio sesión.
    
        ```json
        {
            'error' : 0,
            'level': 1
      }
        
* **Error Response:** 
    
    `error: Int`  
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al iniciar sesión"
        }
      ```

***