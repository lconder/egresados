# **business**

##### Registrar un nuevo convenio/empresa.

* **URL**

  /business/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

    None
 
* **Data Params**
    
    **Required:**

    `business_name: String`  
    `rfc: String`  
    `phone: String`  
    `street: String`  
    `external_number: String`  
    `internal_number: String`  
    `postal_code: String`  
    `suburb: String`  
    `city: String`  
    `facebook: String`  
    `twitter: String`  
    `website: String`  
    `state: Int`  
    `business_type: String`
    `categorie: Int`
    `business_size: String`
    `discount_description: String`
    `graduated: Int`
    `attendant_name: String`
    `attendant_lastname: String`
    `attendant_second_lastname: String`
    `email: String`
    `mobile: String`
    `address: String`


    **Optional:**
    
    None
        
* **Success Response:**

    `error: Int` 
    'description': String,   
    `business: { created: Boolean }`  
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **business** se encuentra una bandera que indica si todo se ha ralizado de manera aecuada. Este endpoint realiza las siguientes operaciones:

    1. Creación del convenio y de su encargado.
    2. Creación del documento de convenio y envío del mismo.
    3. 
    
		```json
		{
			'error' : 0,
			'description': "Negocio y encargado creados con éxito, correos enviados",
			'business':  { created : true}
      	}
        
* **Error Response:** 
    
    `error: Int`  
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            'error': 1,
            'description': "Error al crear negocio nuevo"
        }
      ```

***