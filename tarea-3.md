# Tarea 3 — Dashboard y gestión de sesiones

**Proyecto:** Gestor de Personal  
**Clase:** Introducción a JavaScript  
**Nivel:** Principiante - Intermedio

---

## Objetivo de esta tarea

Después de login exitoso, mostrar un panel diferente según el rol del usuario y poder cerrar sesión.

- Crear dos secciones: Login y Dashboard
- Mostrar/ocultar según si el usuario está autenticado
- Guardar la sesión actual en `localStorage`
- Implementar botón de cerrar sesión
- Mostrar datos específicos según el rol

---

## Paso 1 — Estructura HTML actualizada

Abrí `index.html` y reemplazá el contenido por:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestor de Personal</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- SECCIÓN LOGIN -->
  <div id="login-section" class="login-container">
    <h1>Gestor de Personal</h1>

    <form id="login-form">
      <label for="usuario">Usuario</label>
      <input type="text" id="usuario" placeholder="Ingresá tu nombre">

      <label for="contrasena">Contraseña</label>
      <input type="password" id="contrasena" placeholder="Ingresá tu contraseña">

      <button type="button" id="btn-ingresar">Ingresar</button>
    </form>

    <p id="mensaje"></p>
  </div>

  <!-- SECCIÓN DASHBOARD -->
  <div id="dashboard-section" class="dashboard-container" style="display: none;">
    <div class="dashboard-header">
      <h1>Panel de Control</h1>
      <div class="user-info">
        <span id="nombre-usuario">Usuario</span>
        <button id="btn-cerrar-sesion" class="btn-logout">Cerrar sesión</button>
      </div>
    </div>

    <div class="dashboard-content">
      <p id="bienvenida"></p>
      <div id="panel-admin" class="panel-role" style="display: none;">
        <h2>Panel Administrador</h2>
        <p>Tienes acceso total al sistema.</p>
      </div>

      <div id="panel-supervisor" class="panel-role" style="display: none;">
        <h2>Panel Supervisor</h2>
        <p>Puedes supervisar empleados.</p>
      </div>

      <div id="panel-empleado" class="panel-role" style="display: none;">
        <h2>Panel Empleado</h2>
        <p>Vista limitada de tus datos.</p>
      </div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

---

## Paso 2 — Actualizar estilos CSS

Abrí `styles.css` y agregá estos estilos al final:

```css
/* DASHBOARD */
.dashboard-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.dashboard-header {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dashboard-header h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info span {
  font-weight: bold;
  color: #4361ee;
}

.btn-logout {
  padding: 8px 16px;
  background-color: #ef476f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-logout:hover {
  background-color: #d63654;
}

.dashboard-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.panel-role {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-left: 4px solid #4361ee;
  border-radius: 4px;
}

.panel-role h2 {
  color: #333;
  margin-top: 0;
}

#bienvenida {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}
```

---

## Paso 3 — Crear función de sesión

En `app.js`, después de `inicializarUsuarios()`, agregá:

```js
const CLAVE_SESION = 'gp_sesion_actual'

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
```

---

## Paso 4 — Controlar visibilidad de secciones

Agregá esta función antes de los event listeners:

```js
function mostrarLogin() {
  document.getElementById('login-section').style.display = 'block'
  document.getElementById('dashboard-section').style.display = 'none'
}

function mostrarDashboard(sesion) {
  document.getElementById('login-section').style.display = 'none'
  document.getElementById('dashboard-section').style.display = 'block'
  
  // Mostrar nombre en header
  document.getElementById('nombre-usuario').textContent = sesion.nombre
  
  // Mostrar bienvenida
  document.getElementById('bienvenida').textContent = 
    `Bienvenido ${sesion.nombre} (${sesion.rol})`
  
  // Mostrar panel según rol
  document.getElementById('panel-admin').style.display = 
    sesion.rol === 'administrador' ? 'block' : 'none'
  document.getElementById('panel-supervisor').style.display = 
    sesion.rol === 'supervisor' ? 'block' : 'none'
  document.getElementById('panel-empleado').style.display = 
    sesion.rol === 'empleado' ? 'block' : 'none'
}
```

---

## Paso 5 — Modificar el login

Reemplazá la sección final del `addEventListener('click')` que muestra el mensaje, por:

```js
  // Guardar sesión
  guardarSesion(usuarioEncontrado)
  
  // Mostrar dashboard
  mostrarDashboard(usuarioEncontrado)
  
  // Limpiar formulario
  inputUsuario.value = ''
  inputContrasena.value = ''
```

---

## Paso 6 — Cerrar sesión

Agregá este event listener al final:

```js
document.getElementById('btn-cerrar-sesion').addEventListener('click', function() {
  cerrarSesion()
  mostrarLogin()
  parrafoMensaje.textContent = 'Sesión cerrada correctamente.'
})
```

---

## Paso 7 — Verificar sesión al cargar la página

Agregá esto al final del `app.js`, después de todos los event listeners:

```js
// Al cargar la página, verificar si ya hay sesión activa
const sesionActual = obtenerSesion()
if (sesionActual) {
  mostrarDashboard(sesionActual)
} else {
  mostrarLogin()
}
```

---

## Código final de `app.js` (referencia)

Aquí puedes ver cómo debe quedar aproximadamente:

```js
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
```

---

## Conceptos aprendidos

| Concepto | ¿Qué hace? |
|----------|-----------|
| Estructura de sesión | Guardar datos del usuario autenticado |
| `style.display` | Mostrar/ocultar elementos dinámicamente |
| Verificación al cargar | Mantener sesión aunque recargue la página |
| Cerrar sesión | Limpiar datos y volver al login |
| Paneles por rol | Mostrar contenido diferente según permiso |

---

## Desafío extra (opcional)

1. Agregá una hora de expiración a la sesión (30 minutos). Si pasó ese tiempo, mostrar login nuevamente.
2. Agregá un mensaje con la hora en que el usuario inició sesión.
3. Hacé que el botón "Cerrar sesión" muestre una confirmación antes de cerrar.

> **Pista para punto 1**: Podés comparar timestamps con `new Date().getTime()`
