const baseURL = "https://api.restful-api.dev/objects";

// 1. Funcion para listar todos los elementos con formato legible
function listarElementos() {
    fetch(baseURL)
        .then(response => {
            if (!response.ok) throw new Error("Error al obterner los datos");
            return response.json();
        })
        .then(data => {
            const resultados = data.filter(item => item.data).map(item => {
                const { brand, model, data } = item;
                return `${brand} ${model} (color: ${data.color}, capacity: ${data.capacity || "N/A"})`;
            });
            console.log("Elementos formatiados:");
            resultados.forEach(item => console.log(item));
        })
        .catch(error => console.error("Eror:", error));
}

// 2. Funcion para crear un usuario
function crearUsuario(nombre, correo, contrasena, direccion) {
    const nuevoUsuario = {
        name: nombre,
        email: correo,
        password: contrasena,
        address: direccion
    };

    fetch(`${baseURL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error al crear el usuario");
            return response.json();
        })
        .then(data => console.log("Usuario creado . ID:", data.id))
        .catch(error => console.error("Eror:", error));
}

// 3. Funcion para obtener un usuario por su ID
function obtenerUsuarioPorID(id) {
    fetch(`${baseURL}/${id}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) throw new Error("Usuario no encontado");
                throw new Error("Eror al obterner el usuario");
            }
            return response.json();
        })
        .then(data => console.log("Usuario encontado:", data))
        .catch(error => console.error("Eror:", error));
}

// 4. Funcion para actualizar la direccion de un usuario
function actualizarDireccion(id, nuevaDireccion) {
    const actualizacion = { address: nuevaDireccion };

    fetch(`${baseURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizacion)
    })
        .then(response => {
            if (!response.ok) throw new Error("Eror al actualizar la direccion");
            return response.json();
        })
        .then(data => console.log("Direccion actualizada :", data))
        .catch(error => console.error("Eror:", error));
}

// listarElementos();
// crearUsuario("Juan Perez", "juanperez@example.com", "password123", "Calle desampa 123");
// obtenerUsuarioPorID("id-ejemplo");
// actualizarDireccion("id-ejemplo", "Nueva Calle 456");
