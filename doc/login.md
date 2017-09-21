# **login**

##### Iniciar sesión las apps móviles.

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
    `access: Boolean`  
    `idUser: Int`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **acces** se encuentra una bandera indicando si el acceso es correcto o no, además en **idUser** el id de usuario para su posterior uso, este endpoint realiza las siguientes tareas:

    1. Revisar si el egresado tiene una cuenta en intrauia.
    2. Si tiene cuenta, buscará en la base de datos al egresado basado en su matricula.
    3. Si no existe se creará.
    
        ```json
        {
            error' : 0,
            'acces' : true,
            'idUser': 1
        }
        
* **Error Response:** 
    
    `error: Int`  
    `desc: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica y en que punto existió el fallo (1, 2 ó 3).

    ```json
        {
            'error': 1,
            'desc': "Error al iniciar sesión"
        }
      ```

***