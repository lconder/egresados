# **promotion_business**

##### Generar una promoción en las sucursales enviadas por el usuario.

* **URL**

  /promotion_business/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

    None
 
* **Data Params**
    
    **Required:**

    `date_expired: Date`  
    `date_created: Date`  
    `name: String`  
    `promo_description: String`  
    `branchs: [String]`  

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `promo: [  
    	{  
			created: Boolean  
    	}  
    ]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **promo** se encuentra una bandera llamada created, si existió algún error DE CREACIÓN esta bandera tendrá un valor false.
    
        ```json
        {
            'error' : 0,
            'promo': [ 
            	{           	
					created: true
				}
            ]
      }
        
* **Error Response:** 
    
    `error: Int`  
    `business: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **promo** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'promo': "Error al crear promoción"
        }
      ```

***