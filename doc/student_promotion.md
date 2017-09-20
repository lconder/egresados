# **Student_promotion**

##### Obtener las promociones que ha consumido cierto estudiante basado en su ID.

* **URL**

  /student_promotion/:id_student

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

    `id_student: Int`  
 
* **Data Params**
    
    **Required:**

    None

    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int`  
    `promotions: [  
    	{  
			date: Date,  
			description: String,  
			name: String,  
			address: String  
    	}  
    ]`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **promotions** se encuentra un arreglo de promociones basado en el modelo anteriormente mencionado.
    
        ```json
        {
            'error' : 0,
            'promotions': [ 
            	{           	
					date: "2017-08-03",  
					description: "Descripción de la promoción",  
					name: "Nombre de la promoción",  
					address: "11 Sur 1234 Col. Centro 72498"  
				}
            ]
      }
        
* **Error Response:** 
    
    `error: Int`  
    `promotions: String`  

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **promotions** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'promotions': "Error al encontrar promociones por estudiante"
        }
      ```

***