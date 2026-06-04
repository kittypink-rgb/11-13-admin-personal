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

const sesionActual = obtenerSesion()
if (sesionActual) {
  mostrarDashboard(sesionActual)
} else {
  mostrarLogin()
}



// AGREGAR EMPLEADO
const btnAgregarEmpleado = document.getElementById('btn-agregar-empleado')
const formularioEmpleado = document.getElementById('formulario-empleado')
const mensajeEmpleado = document.getElementById('mensaje-empleado')

btnAgregarEmpleado.addEventListener('click', function() {
  const nombre = document.getElementById('emp-nombre').value.trim()
  const puesto = document.getElementById('emp-puesto').value.trim()
  const departamento = document.getElementById('emp-departamento').value.trim()
  const salario = document.getElementById('emp-salario').value.trim()

  // Limpiar mensaje anterior
  mensajeEmpleado.textContent = ''
  mensajeEmpleado.classList.remove('success', 'error')

  // Validar campos
  if (nombre === '') {
    mensajeEmpleado.textContent = 'Por favor ingresá el nombre.'
    mensajeEmpleado.classList.add('error')
    return
  }

  if (puesto === '') {
    mensajeEmpleado.textContent = 'Por favor ingresá el puesto.'
    mensajeEmpleado.classList.add('error')
    return
  }

  if (departamento === '') {
    mensajeEmpleado.textContent = 'Por favor seleccioná un departamento.'
    mensajeEmpleado.classList.add('error')
    return
  }

  if (salario === '' || isNaN(salario) || salario <= 0) {
    mensajeEmpleado.textContent = 'Por favor ingresá un salario válido.'
    mensajeEmpleado.classList.add('error')
    return
  }

  // Agregar el empleado
  const empleado = agregarEmpleado(nombre, puesto, departamento, salario)

  // Mostrar éxito
  mensajeEmpleado.textContent = `✓ Empleado ${nombre} agregado correctamente.`
  mensajeEmpleado.classList.add('success')

  // Limpiar formulario
  document.getElementById('emp-nombre').value = ''
  document.getElementById('emp-puesto').value = ''
  document.getElementById('emp-departamento').value = ''
  document.getElementById('emp-salario').value = ''

  // Ocultar mensaje después de 3 segundos
  setTimeout(function() {
    mensajeEmpleado.textContent = ''
    mensajeEmpleado.classList.remove('success', 'error')
  }, 3000)
})

function renderizarTablaEmpleados() {
  const empleados = obtenerEmpleados()
  const cuerpoTabla = document.getElementById('cuerpo-tabla')
  const sinEmpleados = document.getElementById('sin-empleados')
  
  cuerpoTabla.innerHTML = ''

  if (empleados.length === 0) {
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
  }
}

// MODAL EDITAR
const modalEditar = document.getElementById('modal-editar')
const btnGuardarEdicion = document.getElementById('btn-guardar-edicion')
const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion')
const closeModal = document.querySelector('.close-modal')

closeModal.addEventListener('click', cerrarModalEditar)

btnCancelarEdicion.addEventListener('click', cerrarModalEditar)

btnGuardarEdicion.addEventListener('click', function() {
  const nombre = document.getElementById('edit-nombre').value.trim()
  const puesto = document.getElementById('edit-puesto').value.trim()
  const departamento = document.getElementById('edit-departamento').value.trim()
  const salario = document.getElementById('edit-salario').value.trim()

  if (nombre === '' || puesto === '' || departamento === '' || salario === '') {
    alert('Por favor completa todos los campos.')
    return
  }

  actualizarEmpleado(empleadoEnEdicion.id, nombre, puesto, departamento, salario)
  cerrarModalEditar()
  renderizarTablaEmpleados()
})

// Cerrar modal si clickea fuera del contenido
window.addEventListener('click', function(event) {
  if (event.target === modalEditar) {
    cerrarModalEditar()
  }
})
