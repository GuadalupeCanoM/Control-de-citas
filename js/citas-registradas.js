function cargarCitas() {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    const tablaCitas = document.getElementById('tabla-citas').getElementsByTagName('tbody')[0];

    citas.forEach((cita, index) => {
        const fila = tablaCitas.insertRow();

        const fechaHoraFormateada = new Date(cita.fechaHora).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const nombreCompleto = `${cita.nombre} ${cita.apellidos}`;

        fila.insertCell(0).innerText = cita.dni;
        fila.insertCell(1).innerText = nombreCompleto;
        fila.insertCell(2).innerText = fechaHoraFormateada;
        fila.insertCell(3).innerText = cita.telefono;
        fila.insertCell(4).innerText = cita.observaciones;

        // Botón para modificar la cita
        const modificarBtn = document.createElement('button');
        modificarBtn.innerText = 'Modificar';
        modificarBtn.onclick = () => mostrarFormularioModificacion(index, fila);
        fila.insertCell(5).appendChild(modificarBtn);

        // Botón para eliminar la cita
        const eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = 'Eliminar';
        eliminarBtn.onclick = () => eliminarCita(index);
        fila.insertCell(6).appendChild(eliminarBtn);
    });
}

function mostrarFormularioModificacion(index, fila) {
    // Eliminar cualquier formulario de modificación existente
    const formularioExistente = document.getElementById('form-modificar-cita');
    if (formularioExistente) {
        formularioExistente.parentElement.parentElement.remove();
    }

    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    let cita = citas[index];

    const formularioDiv = document.createElement('tr');
    formularioDiv.innerHTML = `
        <td colspan="7">
            <h3>Modificar Cita</h3>
            <form id="form-modificar-cita">
                <label>DNI: <input type="text" id="dni" value="${cita.dni}"></label><br>
                <label>Nombre: <input type="text" id="nombre" value="${cita.nombre}"></label><br>
                <label>Apellidos: <input type="text" id="apellidos" value="${cita.apellidos}"></label><br>
                <label>Fecha y Hora: <input type="datetime-local" id="fechaHora" value="${new Date(cita.fechaHora).toISOString().slice(0, 16)}"></label><br>
                <label>Teléfono: <input type="text" id="telefono" value="${cita.telefono}"></label><br>
                <label>Observaciones: <input type="text" id="observaciones" value="${cita.observaciones}"></label><br>
                <button type="button" onclick="guardarModificacion(${index})">Guardar</button>
            </form>
        </td>
    `;
    fila.parentNode.insertBefore(formularioDiv, fila.nextSibling);
}

function guardarModificacion(index) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    let cita = citas[index];

    cita.dni = document.getElementById('dni').value;
    cita.nombre = document.getElementById('nombre').value;
    cita.apellidos = document.getElementById('apellidos').value;
    cita.fechaHora = new Date(document.getElementById('fechaHora').value).toISOString();
    cita.telefono = document.getElementById('telefono').value;
    cita.observaciones = document.getElementById('observaciones').value;

    citas[index] = cita;
    localStorage.setItem('citas', JSON.stringify(citas));
    location.reload(); // Recargar la página para mostrar los cambios
}

function eliminarCita(index) {
    let citas = JSON.parse(localStorage.getItem('citas')) || [];
    citas.splice(index, 1);
    localStorage.setItem('citas', JSON.stringify(citas));
    location.reload(); // Recargar la página para mostrar los cambios
}

// Cargar las citas al cargar la página
window.onload = cargarCitas;