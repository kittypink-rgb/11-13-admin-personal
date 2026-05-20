const CLAVE_USUARIOS = 'gp_usuarios'
const CLAVE_SESION = 'gp_sesion_actual'

const usuariosIniciales = [
  { usuario: 'admin', contrasena: 'admin123', rol: 'administrador', nombre: 'Ana' },
  { usuario: 'supervisor1', contrasena: 'super123', rol: 'supervisor', nombre: 'Carlos' },
  { usuario: 'empleado1', contrasena: 'emple123', rol: 'empleado', nombre: 'Luisa' }
]

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

inicializarUsuarios()

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