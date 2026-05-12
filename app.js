const CLAVE_USUARIOS = 'gp_usuarios'

const usuariosIniciales = [
  { usuario: 'malfitano', contrasena: 'admin123', rol: 'administrador', nombre: 'malfi' },
  { usuario: 'miguel', contrasena: 'luis123', rol: 'administrador', nombre: 'miguel' },
  { usuario: 'ruth', contrasena: '1230', rol: 'administrador', nombre: 'ruth' },
  { usuario: 'lady', contrasena: 'lady123', rol: 'administrador', nombre: 'lady' },
  { usuario: 'supervisor1', contrasena: 'super123', rol: 'supervisor', nombre: 'Carlos' },
  { usuario: 'empleado1', contrasena: 'emple123', rol: 'empleado', nombre: 'Luisa' }
]

function inicializarUsuarios() {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)

  if (!usuariosGuardados) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales))
  }
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

  if (usuarioEncontrado.rol === 'administrador') {
    parrafoMensaje.textContent = `Bienvenido ${usuarioEncontrado.nombre}. Panel: Administrador.`
  } else if (usuarioEncontrado.rol === 'supervisor') {
    parrafoMensaje.textContent = `Bienvenido ${usuarioEncontrado.nombre}. Panel: Supervisor.`
  } else {
    parrafoMensaje.textContent = `Bienvenida ${usuarioEncontrado.nombre}. Panel: Empleado.`
  }

  
})
