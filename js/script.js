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
    datos.forEach(Personas => {
        tabla.innerHTML += `
            <tr>
                <td> ${Personas.id}</td>
                <td> ${Personas.Nombre}</td>
                <td> ${Personas.Apellido}</td>
                <td> ${Personas.Correo}</td>
                <td> 
                <button>Editar</button>
                <button onclick="EliminarPersona(${Personas.id})">Eliminar</button>
                </td>
            </tr>
        `;

    });
}

obtenerRegistros();




//proceso para agregar registros 
const modal = document.getElementById("mdAgregar") //cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar") //boton flotante 
const btnCerrar = document.getElementById("btnCerrarModal") //boton de cerar formulario

btnAgregar.addEventListener("click" , ()=>{
    modal.showModal(); //abre el modal cuando se hace click 
}); 

btnCerrar.addEventListener("click", ()=> {
    modal.close(); //cierra el modal al hacer click 
});


//agregar un nuevo integrante desde el fromulario 
document.getElementById("frmAgregar").addEventListener("submit", async e => { // "e" es el elemento submit
    e.preventDefault(); //evita que los datos se envien por defecto 

    //capturar los valores del fromulario 
    const Nombre = document.getElementById("txtNombre").value.trim();

    const Apellido = document.getElementById("txtApellido").value.trim();
    
    const Correo = document.getElementById("txtCorreo").value.trim();

    //validacion basica 
    if (!Nombre || !Apellido || !Correo){
        alert("Complete todos los campos")
        return; //Evita que el codigo se siga ejecutando 
    }

    //Llamar a la API para enviar los datos 
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({Nombre,Apellido,Correo})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");
        
        //Limpiar formulario
        document.getElementById("frmAgregar").reset();
        
        //Cerrar el formulario
        modal.close();

        //recargar tabla
        obtenerRegistros();
    }
    else
    {
        ("ERROR!: No fue posible agregar el registro")
    }

}); 




//funcion para borrra registros 
async function EliminarPersona(id) {
    const confirmacion = confirm("¿Desea eliminar el registo ?")

    //validar si el usuario eligio "aceptar"
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }); //llamada al endpoint
        
        //recargar tabla para actualizar la vista 
        obtenerRegistros();
    }
}


