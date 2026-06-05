const CLAVE_USUARIOS = 'gp_usuarios'
const CLAVE_SESION = 'gp_sesion_actual'

const usuariosIniciales = [
  { usuario: 'admin', contrasena: 'admin123', rol: 'administrador', nombre: 'Ana' },
  { usuario: 'supervisor1', contrasena: 'super123', rol: 'supervisor', nombre: 'Carlos' },
  { usuario: 'empleado1', contrasena: 'emple123', rol: 'empleado', nombre: 'Luisa' }
]
//ooo
const CLAVE_EMPLEADOS = 'gp_empleados'

const empleadosIniciales = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    puesto: 'Desarrollador',
    departamento: 'IT',
    salario: 3000
  },
  {
    id: 2,
    nombre: 'María García',
    puesto: 'Diseñadora',
    departamento: 'Diseño',
    salario: 2800
  }
]

function inicializarEmpleados() {
  const empleadosGuardados = localStorage.getItem(CLAVE_EMPLEADOS)
  if (!empleadosGuardados) {
    localStorage.setItem(CLAVE_EMPLEADOS, JSON.stringify(empleadosIniciales))
  }
}

inicializarUsuarios()
inicializarEmpleados()
//ooo
function inicializarUsuarios() {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)
  if (!usuariosGuardados) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales))
  }
}

function guardarSesion(usuario) {
  const sesion = {
    usuario: usuario.usuario,
    nombre: usuario.nombre,
    rol: usuario.rol,
    timestamp: new Date().toISOString()
  }
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
}

function obtenerSesion() {
  const sesion = localStorage.getItem(CLAVE_SESION)
  return sesion ? JSON.parse(sesion) : null
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION)
}

function mostrarLogin() {
  document.getElementById('login-section').style.display = 'block'
  document.getElementById('dashboard-section').style.display = 'none'
}

function mostrarDashboard(sesion) {
  document.getElementById('login-section').style.display = 'none'
  document.getElementById('dashboard-section').style.display = 'block'
  document.getElementById('nombre-usuario').textContent = sesion.nombre
  document.getElementById('bienvenida').textContent = `Bienvenido ${sesion.nombre} (${sesion.rol})`
  
  const esAdmin = sesion.rol === 'administrador'
  document.getElementById('panel-admin').style.display = esAdmin ? 'block' : 'none'
  document.getElementById('panel-supervisor').style.display = sesion.rol === 'supervisor' ? 'block' : 'none'
  document.getElementById('panel-empleado').style.display = sesion.rol === 'empleado' ? 'block' : 'none'

  // Renderizar tabla solo si es admin
  if (esAdmin) {
    renderizarTablaEmpleados()
  }
}

function obtenerIdNuevo() {
  const empleados = JSON.parse(localStorage.getItem(CLAVE_EMPLEADOS)) || []
  if (empleados.length === 0) return 1
  return Math.max(...empleados.map(e => e.id)) + 1
}

function agregarEmpleado(nombre, puesto, departamento, salario) {
  const empleados = JSON.parse(localStorage.getItem(CLAVE_EMPLEADOS)) || []

  const nuevoEmpleado = {
    id: obtenerIdNuevo(),
    nombre,
    puesto,
    departamento,
    salario: parseInt(salario)
  }

  empleados.push(nuevoEmpleado)
  localStorage.setItem(CLAVE_EMPLEADOS, JSON.stringify(empleados))

  return nuevoEmpleado
}

function obtenerEmpleados() {
  return JSON.parse(localStorage.getItem(CLAVE_EMPLEADOS)) || []
}

function eliminarEmpleado(id) {
  let empleados = obtenerEmpleados()
  empleados = empleados.filter(e => e.id !== id)
  localStorage.setItem(CLAVE_EMPLEADOS, JSON.stringify(empleados))
}

function actualizarEmpleado(id, nombre, puesto, departamento, salario) {
  let empleados = obtenerEmpleados()
  const empleado = empleados.find(e => e.id === id)
  
  if (empleado) {
    empleado.nombre = nombre
    empleado.puesto = puesto
    empleado.departamento = departamento
    empleado.salario = parseInt(salario)
    localStorage.setItem(CLAVE_EMPLEADOS, JSON.stringify(empleados))
    return true
  }
  return false
}


const boton = document.querySelector('#btn-ingresar')
const inputUsuario = document.querySelector('#usuario')
const inputContrasena = document.querySelector('#contrasena')
const parrafoMensaje = document.querySelector('#mensaje')

boton.addEventListener('click', function() {
  const usuarioIngresado = inputUsuario.value.trim()
  const contrasenaIngresada = inputContrasena.value.trim()

  if (usuarioIngresado === '') {
    parrafoMensaje.textContent = 'Por favor ingresá tu usuario.'
    return
  }

  if (contrasenaIngresada === '') {
    parrafoMensaje.textContent = 'Por favor ingresá tu contraseña.'
    return
  }

  const usuarios = JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || []
  const usuarioEncontrado = usuarios.find(function(u) {
    return u.usuario === usuarioIngresado && u.contrasena === contrasenaIngresada
  })

  if (!usuarioEncontrado) {
    parrafoMensaje.textContent = 'Usuario o contraseña incorrectos.'
    return
  }

  guardarSesion(usuarioEncontrado)
  mostrarDashboard(usuarioEncontrado)
  inputUsuario.value = ''
  inputContrasena.value = ''
})

document.getElementById('btn-cerrar-sesion').addEventListener('click', function() {
  cerrarSesion()
  mostrarLogin()
  parrafoMensaje.textContent = 'Sesión cerrada correctamente.'
})

// AGREGAR EMPLEADO
const btnAgregarEmpleado = document.getElementById('btn-agregar-empleado')
const mensajeEmpleado = document.getElementById('mensaje-empleado')
const inputBuscarEmpleado = document.getElementById('buscar-empleado')
const filtroDepartamento = document.getElementById('filtro-departamento')

function mostrarMensajeEmpleado(texto, tipo) {
  mensajeEmpleado.textContent = texto
  mensajeEmpleado.classList.remove('success', 'error')
  mensajeEmpleado.classList.add(tipo)
}

function limpiarMensajeEmpleado() {
  mensajeEmpleado.textContent = ''
  mensajeEmpleado.classList.remove('success', 'error')
}

function normalizarTexto(texto) {
  return texto.toLowerCase().trim()
}

function existeEmpleadoDuplicado(nombre, idIgnorado = null) {
  const nombreNormalizado = normalizarTexto(nombre)
  return obtenerEmpleados().some(function(empleado) {
    return empleado.id !== idIgnorado && normalizarTexto(empleado.nombre) === nombreNormalizado
  })
}

function obtenerEmpleadosFiltrados() {
  const busqueda = normalizarTexto(inputBuscarEmpleado.value)
  const departamentoSeleccionado = filtroDepartamento.value

  return obtenerEmpleados().filter(function(empleado) {
    const coincideBusqueda =
      normalizarTexto(empleado.nombre).includes(busqueda) ||
      normalizarTexto(empleado.puesto).includes(busqueda)

    const coincideDepartamento =
      departamentoSeleccionado === '' || empleado.departamento === departamentoSeleccionado

    return coincideBusqueda && coincideDepartamento
  })
}

btnAgregarEmpleado.addEventListener('click', function() {
  const nombre = document.getElementById('emp-nombre').value.trim()
  const puesto = document.getElementById('emp-puesto').value.trim()
  const departamento = document.getElementById('emp-departamento').value.trim()
  const salario = document.getElementById('emp-salario').value.trim()

  // Limpiar mensaje anterior
  limpiarMensajeEmpleado()

  // Validar campos
  if (nombre.length < 3) {
    mostrarMensajeEmpleado('El nombre debe tener al menos 3 caracteres.', 'error')
    return
  }

  if (puesto === '') {
    mostrarMensajeEmpleado('Por favor ingresá el puesto.', 'error')
    return
  }

  if (departamento === '') {
    mostrarMensajeEmpleado('Por favor seleccioná un departamento.', 'error')
    return
  }

  if (salario === '' || isNaN(salario) || salario <= 0) {
    mostrarMensajeEmpleado('Por favor ingresá un salario mayor a cero.', 'error')
    return
  }

  if (existeEmpleadoDuplicado(nombre)) {
    mostrarMensajeEmpleado('Ya existe un empleado con ese nombre.', 'error')
    return
  }

  // Agregar el empleado
  agregarEmpleado(nombre, puesto, departamento, salario)
  renderizarTablaEmpleados()

  // Mostrar éxito
  mostrarMensajeEmpleado(`✓ Empleado ${nombre} agregado correctamente.`, 'success')

  // Limpiar formulario
  document.getElementById('emp-nombre').value = ''
  document.getElementById('emp-puesto').value = ''
  document.getElementById('emp-departamento').value = ''
  document.getElementById('emp-salario').value = ''

  // Ocultar mensaje después de 3 segundos
  setTimeout(function() {
    limpiarMensajeEmpleado()
  }, 3000)
})

function renderizarTablaEmpleados() {
  const empleados = obtenerEmpleadosFiltrados()
  const totalEmpleados = obtenerEmpleados().length
  const cuerpoTabla = document.getElementById('cuerpo-tabla')
  const sinEmpleados = document.getElementById('sin-empleados')
  
  cuerpoTabla.innerHTML = ''

  if (empleados.length === 0) {
    sinEmpleados.textContent = totalEmpleados === 0
      ? 'No hay empleados registrados. Agregá el primero usando el formulario superior.'
      : 'No hay empleados que coincidan con la búsqueda o el filtro seleccionado.'
    sinEmpleados.style.display = 'block'
    return
  }

  sinEmpleados.style.display = 'none'

  empleados.forEach(function(empleado) {
    const fila = document.createElement('tr')
    
    fila.innerHTML = `
      <td>${empleado.id}</td>
      <td>${empleado.nombre}</td>
      <td>${empleado.puesto}</td>
      <td>${empleado.departamento}</td>
      <td>$${empleado.salario.toLocaleString()}</td>
      <td>
        <div class="btn-grupo">
          <button class="btn-editar" onclick="abrirModalEditar(${empleado.id})">
            Editar
          </button>
          <button class="btn-eliminar" onclick="confirmarEliminar(${empleado.id})">
            Eliminar
          </button>
        </div>
      </td>
    `
    
    cuerpoTabla.appendChild(fila)
  })
}

let empleadoEnEdicion = null

function abrirModalEditar(id) {
  const empleados = obtenerEmpleados()
  empleadoEnEdicion = empleados.find(e => e.id === id)

  if (empleadoEnEdicion) {
    document.getElementById('edit-nombre').value = empleadoEnEdicion.nombre
    document.getElementById('edit-puesto').value = empleadoEnEdicion.puesto
    document.getElementById('edit-departamento').value = empleadoEnEdicion.departamento
    document.getElementById('edit-salario').value = empleadoEnEdicion.salario
    
    document.getElementById('modal-editar').style.display = 'block'
  }
}

function cerrarModalEditar() {
  document.getElementById('modal-editar').style.display = 'none'
  empleadoEnEdicion = null
}

function confirmarEliminar(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
    eliminarEmpleado(id)
    renderizarTablaEmpleados()
    mostrarMensajeEmpleado('✓ Empleado eliminado correctamente.', 'success')
  }
}

inputBuscarEmpleado.addEventListener('input', renderizarTablaEmpleados)
filtroDepartamento.addEventListener('change', renderizarTablaEmpleados)

// MODAL EDITAR
const modalEditar = document.getElementById('modal-editar')
const btnGuardarEdicion = document.getElementById('btn-guardar-edicion')
const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion')
const closeModal = document.querySelector('.close-modal')

closeModal.addEventListener('click', cerrarModalEditar)

btnCancelarEdicion.addEventListener('click', cerrarModalEditar)

btnGuardarEdicion.addEventListener('click', function() {
  if (!empleadoEnEdicion) {
    alert('No hay ningún empleado seleccionado para editar.')
    return
  }

  const nombre = document.getElementById('edit-nombre').value.trim()
  const puesto = document.getElementById('edit-puesto').value.trim()
  const departamento = document.getElementById('edit-departamento').value.trim()
  const salario = document.getElementById('edit-salario').value.trim()

  if (nombre.length < 3) {
    alert('El nombre debe tener al menos 3 caracteres.')
    return
  }

  if (puesto === '' || departamento === '') {
    alert('Por favor completa todos los campos.')
    return
  }

  if (salario === '' || isNaN(salario) || salario <= 0) {
    alert('Por favor ingresá un salario mayor a cero.')
    return
  }

  if (existeEmpleadoDuplicado(nombre, empleadoEnEdicion.id)) {
    alert('Ya existe otro empleado con ese nombre.')
    return
  }

  actualizarEmpleado(empleadoEnEdicion.id, nombre, puesto, departamento, salario)
  cerrarModalEditar()
  renderizarTablaEmpleados()
  mostrarMensajeEmpleado(`✓ Empleado ${nombre} actualizado correctamente.`, 'success')
})

// Cerrar modal si clickea fuera del contenido
window.addEventListener('click', function(event) {
  if (event.target === modalEditar) {
    cerrarModalEditar()
  }
})

const sesionActual = obtenerSesion()
if (sesionActual) {
  mostrarDashboard(sesionActual)
} else {
  mostrarLogin()
}
