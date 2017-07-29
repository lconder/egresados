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