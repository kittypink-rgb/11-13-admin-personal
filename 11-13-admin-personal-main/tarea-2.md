# Tarea 2 — Login real con rol y `localStorage`

**Proyecto:** Gestor de Personal  
**Clase:** Introducción a JavaScript  
**Nivel:** Principiante - Intermedio

---

## Objetivo de esta tarea

Convertir el login de la Tarea 1 en un login funcional:

- validar usuario y contraseña
- buscar el usuario en una lista guardada en `localStorage`
- mostrar mensaje según su rol (`administrador`, `supervisor`, `empleado`)

---

## Antes de empezar (corrección rápida)

En el HTML actual, el input de contraseña tiene `id="contrasena"` (sin `ñ`), pero en tu `app.js` se está buscando otro id. Eso hace que el login falle.

Asegurate de usar exactamente este selector:

```js
const inputContrasena = document.querySelector('#contrasena')
```

---

## Paso 1 — Estructura de datos para usuarios

Vamos a guardar usuarios de prueba para poder validar el login.

Agregá este bloque al inicio de `app.js`:

```js
const CLAVE_USUARIOS = 'gp_usuarios'

const usuariosIniciales = [
  {
    usuario: 'admin',
    contrasena: 'admin123',
    rol: 'administrador',
    nombre: 'Ana'
  },
  {
    usuario: 'supervisor1',
    contrasena: 'super123',
    rol: 'supervisor',
    nombre: 'Carlos'
  },
  {
    usuario: 'empleado1',
    contrasena: 'emple123',
    rol: 'empleado',
    nombre: 'Luisa'
  }
]
```

---

## Paso 2 — Guardar datos iniciales en `localStorage`

Solo queremos crear estos usuarios si todavía no existen.

```js
function inicializarUsuarios() {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS)

  if (!usuariosGuardados) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales))
  }
}

inicializarUsuarios()
```

---

## Paso 3 — Leer inputs y validar campos vacíos

Partimos de la lógica que ya tenías, pero limpiando espacios:

```js
const boton = document.querySelector('#btn-ingresar')
const inputUsuario = document.querySelector('#usuario')
const inputContrasena = document.querySelector('#contrasena')
const parrafoMensaje = document.querySelector('#mensaje')
```

Y en el evento:

```js
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

  // Paso 4 acá
})
```

---

## Paso 4 — Buscar el usuario y validar credenciales

Dentro del mismo `addEventListener` agregá:

```js
const usuarios = JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) || []

const usuarioEncontrado = usuarios.find(function(u) {
  return u.usuario === usuarioIngresado && u.contrasena === contrasenaIngresada
})

if (!usuarioEncontrado) {
  parrafoMensaje.textContent = 'Usuario o contraseña incorrectos.'
  return
}
```

---

## Paso 5 — Mostrar panel según rol

Después de validar, mostramos una bienvenida por rol:

```js
if (usuarioEncontrado.rol === 'administrador') {
  parrafoMensaje.textContent = `Bienvenida ${usuarioEncontrado.nombre}. Panel: Administrador.`
} else if (usuarioEncontrado.rol === 'supervisor') {
  parrafoMensaje.textContent = `Bienvenido ${usuarioEncontrado.nombre}. Panel: Supervisor.`
} else {
  parrafoMensaje.textContent = `Bienvenida ${usuarioEncontrado.nombre}. Panel: Empleado.`
}
```

---

## Código final sugerido de `app.js`

```js
const CLAVE_USUARIOS = 'gp_usuarios'

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
    parrafoMensaje.textContent = `Bienvenida ${usuarioEncontrado.nombre}. Panel: Administrador.`
  } else if (usuarioEncontrado.rol === 'supervisor') {
    parrafoMensaje.textContent = `Bienvenido ${usuarioEncontrado.nombre}. Panel: Supervisor.`
  } else {
    parrafoMensaje.textContent = `Bienvenida ${usuarioEncontrado.nombre}. Panel: Empleado.`
  }
})
```

---

## Pruebas manuales

1. Intentá ingresar con campos vacíos.
2. Probá usuario válido con contraseña incorrecta.
3. Probá estos accesos:
   - `admin / admin123`
   - `supervisor1 / super123`
   - `empleado1 / emple123`
4. Abrí DevTools -> Application -> Local Storage y verificá que exista `gp_usuarios`.

---

## Conceptos aprendidos

- `localStorage.getItem` / `setItem`
- `JSON.stringify` y `JSON.parse`
- Validación incremental con `return`
- Búsqueda en arrays con `.find()`
- Control de flujo por rol con `if / else if / else`
