**branch_promotion**
----
  Obtener las sucursales que tienen una promoción.

* **URL**

  /branch_promotion/:id_promotion

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
   `id_promotion: Int`
 
* **Data Params**
    
    **Required:**
    None
    **Optional:**
    None
    

* **Success Response:**

    `error: Int`
    `branchs: [
        {
           address: String,
            latitude: Float,
            longitude: Float,
            name: String,
            graduated: Int
        }
    ] `
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **branchs** se encuentran todas las sucursales que pueden dar la promoción.
    
    ```json
        {
	        error: 0,
	        branchs: [
		    {
    			address: "Cúmulo de Virgo 28, Reserva Territorial Atlixcáyotl, Puebla, Pue., Mexico",
    			latitude: 19.0211,
    			longitude: -98.2388,
    			name: "Suc. Angelópolis",
    			graduated: 1
		    }
	    ]
    }
        
* **Error Response:**
    
    `error: Int`
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            error: 1,
            description: "No se pudieron obtener las sucursales"
        }
      ```








**business_type**
----
  Obtener todos los giros de negocios disponibles.

* **URL**

  /business_type

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
    Esto ocurre cuando la petición NO encontró ningún error. En **business_type** se encuentra un array de todos los giros disponibles a usar.
    
    ```json
        error: 0,
        business_type: [
            {id: 0, name: "Servicios"},
            {id: 1, name: "Servicios Educativos"}
        ]
        
* **Error Response:**
    
    `error: Int`
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            error: 1,
            description: "No se pudieron obtener los giros"
        }
      ```






**credential**
----
  Modificar datos de un egresado.

* **URL**

  /credential

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
    None
 
* **Data Params**
    
    **Required:**
    `id_user: Int`
    `user: String`
    `password: String `
    `email: String`
    `streetNumber: String`
    `suburb: String`
    `postal_code: String`
    `phone: String`
    `mobile: String`
    `business_name: String`
    `business_type: Int`
    `position: String`
    `date_start: Date` (AAAA/MM/DD)

    **Optional:**
    None
    
    **Example:**
    {
        idUser: 12,
        user: "0uYxfY9j6A8=",
        password: "EBFDFsnyvIQ=",
         email: "example@gmail.com",
         streetNumber: "11 sur 1234",
         suburb: "Lomas",
         postal_code: "72000",
         phone: "2221026578",
         mobile: "2225698741",
         business_name: "IBERO",
         business_type: 97,
         position: "Jefe",
         date_start: "2017/08/02"
    }
        
* **Success Response:**

    `error: Int`
    `descripton:String`
    `modified: Boolean`
    
    * **error:** 0
    Esto ocurre cuando la petición NO encontró ningún error. En **description** está la descripción de lo ocurrido y en **modified** una bandera la cuál indica si se realizó el update.
    
    ```json
        error: 0,
        description: "Data updated successfully",
        modified: true
        
* **Error Response:**
    
    `error: Int`
    `description: String`

  * **error:** 1
    Esto ocurre cuando la petición encontró un error en  **description** se encuentra el error de manera específica.

    ```json
        {
            error: 1,
            description: "No se pudieron actualizar los datos"
        }
      ```