const axios = require('axios'); 
const baseURL = "https://api.restful-api.dev/objects";

// 1. Funcion para listar todos los elementos con formato legible
function listarElementos() {
    axios.get(baseURL)
        .then(response => {
            const resultados = response.data.filter(item => item.data).map(item => {
                const { brand, model, data } = item;
                return `${brand} ${model} (color: ${data.color}, capacity: ${data.capacity || "N/A"})`;
            });
            console.log("Elementos formatiados:");
            resultados.forEach(item => console.log(item));
        })
        .catch(error => console.error("Eror:", error.message));
}

// 2. Funcion para crear un usuario
function crearUsuario(nombre, correo, contrasena, direccion) {
    const nuevoUsuario = {
        name: nombre,
        email: correo,
        password: contrasena,
        address: direccion
    };

    axios.post(baseURL, nuevoUsuario)
        .then(response => console.log("Usuario creado . ID:", response.data.id))
        .catch(error => console.error("Eror:", error.message));
}

// 3. Funcion para obtener un usuario por su ID
function obtenerUsuarioPorID(id) {
    axios.get(`${baseURL}/${id}`)
        .then(response => console.log("Usuario encontado:", response.data))
        .catch(error => {
            if (error.response && error.response.status === 404) {
                console.error("Usuario no encontado");
            } else {
                console.error("Eror al obterner el usuario:", error.message);
            }
        });
}

// 4. Funcion para actualizar la direccion de un usuario
function actualizarDireccion(id, nuevaDireccion) {
    const actualizacion = { address: nuevaDireccion };

    axios.put(`${baseURL}/${id}`, actualizacion)
        .then(response => console.log("Direccion actualizada :", response.data))
        .catch(error => console.error("Eror al actualizar la direccion:", error.message));
}


