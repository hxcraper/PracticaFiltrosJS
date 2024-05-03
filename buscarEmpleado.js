// MOSTRAR TODOS LOS EMPLEADOS AL INICIAR LA PAGINA
function mostrarTodosLosEmpleados(){
    fetch('Personal.json')
    .then(response => response.json())
    .then(data => {
        mostrarTodosLosEmpleados(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON', error);
        mostrarError('Error al cargar el archivo JSON');
    });
}


// FUNCION PARA MOSTRAR LOS EMPLEADOS EN EL RESULTADO
function mostrarEmpleados(empleados) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '<h2>Lista de empleados</h2>';
    empleados.forEach(empleado => {
        resultadoDiv.innerHTML += `
        <p><strong>Empresa:</strong> ${empleado.EMPRESA}</p>
        <p><strong>RUT:</strong> ${empleado.RUT}</p>
        <p><strong>Nombre:</strong> ${empleado.NOMBRE}</p>
        <p><strong>Cargo:</strong> ${empleado.CARGO}</p>
        <p><strong>Área:</strong> ${empleado['ÁREA']}</p>
        <hr>`;
    });
}


function filtrarEmpleados(){
    const rutInput = document.getElementById('rutInput').value.trim().toLowerCase();
    const cargoSeleccionado = document.getElementById('cargoSelect').value.trim().toLowerCase();
    const areaSeleccionada = document.getElementById('areaSelect').value.trim().toLowerCase();

    fetch('Personal.json')
    .then(response => response.json())
    .then(data => {
        let empleadosFiltrados = data;

        if (rutInput !== ''){
            empleadosFiltrados = empleadosFiltrados.filter(empleado => empleado.RUT.toLowerCase().includes(rutInput));
        }
        if (cargoSeleccionado !== ''){
            empleadosFiltrados = empleadosFiltrados.filter(empleado => empleado.CARGO.toLowerCase() === cargoSeleccionado);
        }
        if (areaSeleccionada !== ''){
            empleadosFiltrados = empleadosFiltrados.filter(empleado => empleado['ÁREA'].toLowerCase() === areaSeleccionada);
        }
        

        // Llamar a la función para mostrar los empleados filtrados
        mostrarEmpleados(empleadosFiltrados);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        mostrarError('Error al cargar el archivo JSON.');
    })
}



// FUNCION PARA MOSTRAR EL RESULTADO
function mostrarError(mensaje){
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>${mensaje}</p>`;
}


// al cargar la pagina mostrar todos los empleados

mostrarTodosLosEmpleados();
