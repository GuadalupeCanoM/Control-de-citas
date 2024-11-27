
/*********************VALIDACIÓN DE DATOS DEL FORMULARIO *********************/

// -----------------------Validar Fecha y hora-----------------------------//

document.getElementById('fecha-hora').addEventListener('blur', validarFechaHora);

function validarFechaHora() {
    const fechaHora = document.getElementById('fecha-hora').value;
    const errorFecha = document.getElementById('error-fecha');

    if (!fechaHora) {
        errorFecha.textContent = 'La fecha y hora son obligatorias.';
        return false;
    }

    const fecha = new Date(fechaHora);
    const ahora = new Date();

    // Verificar si la fecha es anterior al día de hoy
    if (fecha < ahora) {
        errorFecha.textContent = 'La fecha y hora no pueden ser anteriores al día de hoy.';
        return false;
    }

    // Verificar si es fin de semana (sábado o domingo)
    const diaSemana = fecha.getDay();
    if (diaSemana === 0 || diaSemana === 6) {
        errorFecha.textContent = 'La fecha no puede ser en fin de semana.';
        return false;
    }

    // Verificar si la hora está comprendida entre las 09:00 y las 21:00
    const hora = fecha.getHours();
    if (hora < 9 || hora >= 21) {
        errorFecha.textContent = 'La hora debe estar comprendida entre las 09:00 y las 21:00.';
        return false;
    }

    errorFecha.textContent = ''; // Limpiar el mensaje de error
    return true;
}

// -----------------------Validar DNI/NIE-----------------------------//

document.getElementById('dni').addEventListener('blur', validarDNI);

function validarDNI() {
    const dni = document.getElementById('dni').value.trim();
    const errorDNI = document.getElementById('error-dni');

    // Expresiones regulares para validar el DNI y el NIE
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    const nieRegex = /^[XYZ][0-9]{7}[A-Z]$/;

    // Validar el campo de DNI/NIE
    if (dni === '') {
        errorDNI.textContent = 'El DNI/NIE es obligatorio.';
        return false;
    } else if (!dniRegex.test(dni) && !nieRegex.test(dni)) {
        errorDNI.textContent = 'El DNI/NIE no es válido.';
        return false;
    } else {
        errorDNI.textContent = ''; // Limpiar el mensaje de error
        return true;
    }
}

// -----------------------Validar Nombre-----------------------------//

document.getElementById('nombre').addEventListener('blur', validarNombre);

function validarNombre() {
    const nombre = document.getElementById('nombre').value.trim();
    const errorNombre = document.getElementById('error-nombre');

    // Expresión regular para validar que solo contiene letras y espacios
    const nombreRegex = /^[a-zA-Z\s]+$/;

    // Validar el campo de nombre
    if (nombre === '') {
        errorNombre.textContent = 'El nombre es obligatorio.';
        return false;
    } else if (!nombreRegex.test(nombre)) {
        errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
        return false;
    } else {
        errorNombre.textContent = ''; // Limpiar el mensaje de error
        return true;
    }
}

// -----------------------Validar Apellidos-----------------------------//

document.getElementById('apellidos').addEventListener('blur', validarApellidos);   

function validarApellidos() {
    const apellidos = document.getElementById('apellidos').value.trim();
    const errorApellidos = document.getElementById('error-apellidos');

    // Expresión regular para validar que solo contiene letras y espacios
    const apellidosRegex = /^[a-zA-Z\s]+$/;

    // Validar el campo de nombre
    if (apellidos === '') {
        errorApellidos.textContent = 'Los apellidos son obligatorios.';
        return false;
    } else if (!apellidosRegex.test(apellidos)) {
        errorApellidos.textContent = 'Los apellidos solo puede contener letras y espacios.';
        return false;
    } else {
        errorApellidos.textContent = ''; // Limpiar el mensaje de error
        return true;
    }
}

// -----------------------Validar Teléfono-----------------------------//

document.getElementById( 'telefono' ).addEventListener( 'blur', validarTelefono );

function validarTelefono() {
    const telefono = document.getElementById( 'telefono' ).value.trim();
    const errorTelefono = document.getElementById( 'error-telefono' );

    // Expresión regular para validar que solo contiene números
    const telefonoRegex = /^[0-9]{9}$/;

    // Validar el campo de teléfono
    if ( telefono === '' ) {
        errorTelefono.textContent = 'El teléfono es obligatorio.';
        return false;
    } else if ( !telefonoRegex.test( telefono ) ) {
        errorTelefono.textContent = 'El teléfono debe tener 9 dígitos.';
        return false;
    } else {
        errorTelefono.textContent = ''; // Limpiar el mensaje de error
        return true;
    }

}

// -----------------------Validar Teléfono-----------------------------//
// He añadido la validación de la fecha de nacimiento con un año anterior a la fecha actual. 
// Con un año dudo que un bebé vaya a una clínica dental o ya tenga un DNI/NIE asignado pero por comprobar que la fecha de nacimiento sea anterior al día actual
document.getElementById('fecha-nacimiento').addEventListener('blur', validarFechaNacimiento);

function validarFechaNacimiento() {
    const fechaNacimiento = document.getElementById('fecha-nacimiento').value;
    const errorFechaNacimiento = document.getElementById('error-fecha-nacimiento');

    if (!fechaNacimiento) {
        errorFechaNacimiento.textContent = 'La fecha de nacimiento es obligatoria.';
        return false;
    }

    const fecha = new Date(fechaNacimiento);
    const ahora = new Date();
    const haceUnAno = new Date();
    haceUnAno.setFullYear(ahora.getFullYear() - 1);

    // Verificar si la fecha de nacimiento es anterior a hace un año
    if (fecha >= haceUnAno) {
        errorFechaNacimiento.textContent = 'La fecha de nacimiento no es correcta.';
        return false;
    }

    errorFechaNacimiento.textContent = ''; // Limpiar el mensaje de error
    return true;
}


////////////////////////////////////////////////////////////////////////////////////////
// -----------------------VALIDAR FORMULARIO AL ENVIARLO-----------------------------//
////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('formulario-nueva-cita').addEventListener('submit', function(event) {

    const fechaHoraValida = validarFechaHora();
    const dniValido = validarDNI();
    const nombreValido = validarNombre();
    const apellidosValidos = validarApellidos();
    const telefonoValido = validarTelefono();
    const fechaNacimientoValida = validarFechaNacimiento();
    

    // Si alguna validación falla, evitar el envío del formulario y mostrar una alerta
    if (!fechaHoraValida || !dniValido || !nombreValido || !apellidosValidos || !telefonoValido || !fechaNacimientoValida) {
        event.preventDefault();
        alert('Hay campos erróneos en el formulario. Por favor, corrígelos antes de enviar.');
    }
});


