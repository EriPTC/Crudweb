const API_URL = "https://retoolapi.dev/c8kz9u/integrantes";

//funcion que llama a la API y hace Get. obtiene un JSON
async function obtenerRegistros() {
    //hacemos get al servidor y obtenemos su respuesta (response)
    const respuesta = await fetch (API_URL);

    //obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json();

    //llamamos a mostrarregistros y le enviamos el json
    mostrarRegistro(data);
    
}

//Funcion para agregar las filas de la tabla 
//datos representa al archivo json
function mostrarRegistro(datos) {
    const tabla = document.querySelector("#tabla tbody");

    //para inyectar codigo HTML usamos innerHTML
    tabla.innerHTML = "";
    //por cada persona en el json se va a hacer... (lo que esta adentro de las llaves)
    datos.forEach(perosna => {
        tabla.innerHTML += `
            <tr>
                <td> ${perosna.id}</td>
                <td> ${perosna.Nombre}</td>
                <td> ${perosna.Apellido}</td>
                <td> ${perosna.Correo}</td>
                <td> 
                <button>Editar</button>
                <button>Eliminar</button>
                </td>
            </tr>
        `;

    });
}

obtenerRegistros();