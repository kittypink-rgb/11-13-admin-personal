const boton = document.querySelector('#btn-ingresar')
const inputUsuario = document.querySelector('#usuario')
const parrafoMensaje = document.querySelector('#mensaje')

boton.addEventListener('click', function() {
  const nombre = inputUsuario.value

  if (nombre === '') {
    parrafoMensaje.textContent = 'Por favor ingresá tu nombre.'
  } else {
    parrafoMensaje.textContent = `Bienvenido, ${nombre}`
  }
})
