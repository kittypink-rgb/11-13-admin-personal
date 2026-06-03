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
  document.getElementById('panel-admin').style.display = sesion.rol === 'administrador' ? 'block' : 'none'
  document.getElementById('panel-supervisor').style.display = sesion.rol === 'supervisor' ? 'block' : 'none'
  document.getElementById('panel-empleado').style.display = sesion.rol === 'empleado' ? 'block' : 'none'
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