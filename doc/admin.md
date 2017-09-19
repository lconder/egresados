# **Admin**

##### Carga la vista que contiene a todos los administradores creados.

* **URL**

  /admin/

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

    Cargará una vista, la cuál contiene una tabla con los administradores dados de alta, y ciertas opciones.
        
* **Error Response:**

    Esto ocurre cuando la petición encontró algún un error  en este momento cargará la vista principal de la plataforma .

***

##### Carga la vista para agregar un nuevo administrador.

* **URL**

  /admin/add

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

    Cargará una vista, la cuál contiene un formulario para dar de alta un nuevo administrador.
        
* **Error Response:**

    Esto ocurre cuando la petición encontró algún un error  en este momento cargará la vista principal de la plataforma .

***

##### Agregar un nuevo administrador.

* **URL**

  /admin/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
    None
 
* **Data Params**
    
    **Required:**
    
    `name: String`
    `password: String`

    **Optional:**
    None
        
* **Success Response:**

    `error: Int`
    `description: String`
    `admin: { created: Boolean}`
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **description** se encuentra la descripción de lo ocurrido y **admin** es un objeto que contiene todas una bandera para determinar el éxito o fracaso de la subida.
    
        ```json
        {
            'error' : 0,
            'description': "Admin creado con éxito",
            'admin':  { 'created': true }
      }
        
* **Error Response:** 
    
    `error: Int`
    `description: String`
     `admin: { created: Boolean}`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al crear un administrador",
            'admin': { 'created': false }
        }
      ```

***

***

##### Eliminar un administrador.

* **URL**

  /admin/

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
    None
 
* **Data Params**
    
    **Required:**
    
    `id: Int`

    **Optional:**
    None
        
* **Success Response:**

    `error: Int`
    `updated: Boolean`
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **updated** se encuentra una bandera que indica si la eliminación se realizó de manera adecuada.
    
        ```json
        {
            'error' : 0,
            'updated': true
      }
        
* **Error Response:** 
    
    `error: Int`
    `description: String`
    `updated: Boolean`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al eliminar un administrador",
            'updated': false
        }
      ```

***

