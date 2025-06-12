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
                <button onclick="abrirModalEditar ('${Personas.id}', '${Personas.Nombre}', '${Personas.Apellido}','${Personas.Correo}')">Editar</button>
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






//ACTUALIZAR 
    const modalEditar = document.getElementById("mdEditar");
    const btnCerrarEditar = document.getElementById("btnCerrarEditar");

    btnCerrarEditar.addEventListener("click", ()=> {
        modalEditar.close(); //cierra el modal al hacer click 
    });

    function abrirModalEditar (id, Nombre, Apellido, Correo) {
        //Agregar valores a los input antes de abrir el modal
        document.getElementById("txtIdEditar").value = id;
        document.getElementById("txtNombreEditar").value = Nombre;
        document.getElementById("txtApellidoEditar").value = Apellido;
        document.getElementById("txtCorreoEditar").value = Correo;

        //El modal se abre despues de agregar los valores a los input 
        modalEditar.showModal();
    }

    document.getElementById("frmEditar").addEventListener("submit", async e =>{
        e.preventDefault(); //Evita que el formulario se envie de golpe
        const id = document.getElementById("txtIdEditar").value;
        const Nombre = document.getElementById("txtNombreEditar").value.trim();
        const Apellido = document.getElementById("txtApellidoEditar").value.trim();
        const Correo = document.getElementById("txtCorreoEditar").value.trim();

        if(!id || !Nombre || !Apellido || !Correo){
            alert("Complete todos los campos")
            return; //Evita que el codigo se siga ejecutando 
        }

        //llamar a la API
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({Correo, Nombre, Apellido})
        });

        if(respuesta.ok){
            alert("El usuario se actualizo correctamente")
            modalEditar.close();
            obtenerRegistros();
        }
        else
        {
            alert("ERROR al actulizar")
        }

    } );