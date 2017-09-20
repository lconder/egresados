# **RFC**

##### Revisar si un RFC existe.

* **URL**

  /rfc/

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
    `count: Int`    
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **count** se encuentra un número que indica si existe o no ese RFC, 0 para NO, 1 para SI.
    
        ```json
        {
            'error' : 0,
            'count': 1
      }
        
* **Error Response:** 
    
    `error: Int`  
    `desc: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **desc** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'desc': "Error al encontrar rfc"
        }
      ```

***