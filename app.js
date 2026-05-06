const boton = document.querySelector('#btn-ingresar')
const inputUsuario = document.querySelector('#usuario')
const parrafoMensaje = document.querySelector('#mensaje')
const inputContraseña = document.querySelector('#contraseña')

boton.addEventListener('click', function() {
  const nombre = inputUsuario.value
  const contraseña = inputContraseña.value

  if (nombre === '') {
    parrafoMensaje.textContent = 'Por favor ingresá tu nombre.'
  } else if (contraseña === '') {
    parrafoMensaje.textContent = 'Por favor ingresá tu contraseña.'
  } else {
    parrafoMensaje.textContent = `Bienvenido, ${nombre}`
  }
 
})

