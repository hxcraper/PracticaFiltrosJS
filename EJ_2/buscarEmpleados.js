/*Funcionalidades a Implementar:
Mostrar una lista de empleados al cargar la página.
Permitir al usuario filtrar la lista de empleados por cargo y área de trabajo.
Mostrar un mensaje de error si no se puede cargar la lista de empleados.*/

// funcion para mostrar todos los empleados al cargar la pagina
function mostrarAllEmpleados(){
    fetch ('Personal.json')
    .then(response => response.json())
    .then(data => {
        mostrarEmpleados(data);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON', error);
        mostrarError('Error al cargar el archivo JSON');
    });

}
// mostramos todos los empleados
mostrarAllEmpleados();

function mostrarEmpleados(empleados){
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '<h2>Lista de Empleados</h2>';
    empleados.forEach(empleado => {
        resultadoDiv.innerHTML += `
            <p><strong>Empresa:</strong> ${empleado.EMPRESA}</p>
            <p><strong>RUT:</strong> ${empleado.RUT}</p>
            <p><strong>Nombre:</strong> ${empleado.NOMBRE}</p>
            <p><strong>Cargo:</strong> ${empleado.CARGO}</p>
            <p><strong>Área:</strong> ${empleado['ÁREA']}</p>
        <hr>
        `;
    });
}

// Función para filtrar empleados por area y/o Cargo

function filtrarEmpleados(){
    const cargoSeleccionado = document.getElementById('cargoSelect').value.toLowerCase();
    const areaSeleccionada = document.getElementById('areaSelect').value.toLowerCase();

    fetch('Personal.json')
    .then(response => response.json())
    .then(data => {
        let empleadosFiltrados = data;
        if (cargoSeleccionado !== ''){
            empleadosFiltrados = empleadosFiltrados.filter(empleado => empleado.CARGO.toLowerCase() === cargoSeleccionado);

        }
        if (areaSeleccionada !== ''){            
            empleadosFiltrados = empleadosFiltrados.filter(empleado => empleado['ÁREA'].toLowerCase() === areaSeleccionada);


            
        }
        mostrarEmpleados(empleadosFiltrados);
        
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON', error);
        mostrarError('Error al cargar el archivo JSON')
    });
}


function mostrarError(mensaje){
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>${mensaje}</p>`;
}