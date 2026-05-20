# Tarea 4 — Agregar empleados (Create)

**Proyecto:** Gestor de Personal  
**Clase:** Introducción a JavaScript  
**Nivel:** Intermedio

---

## Objetivo de esta tarea

Implementar un formulario para agregar nuevos empleados. Solo administradores pueden hacerlo.

- Crear un formulario para datos del empleado
- Validar que todos los campos estén completos
- Agregar el empleado a `localStorage`
- Mostrar un mensaje de éxito
- Limpiar el formulario después de agregar

---

## Antes de empezar

Necesitamos una estructura para guardar empleados diferente a los usuarios de login. Vamos a crear una clave en `localStorage` llamada `'gp_empleados'`.

---

## Paso 1 — Estructura de datos para empleados

En `app.js`, después de `usuariosIniciales`, agregá:

```js
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
```

Llamá a esta función después de `inicializarUsuarios()`:

```js
inicializarUsuarios()
inicializarEmpleados()
```

---

## Paso 2 — Actualizar el HTML del panel admin

Abrí `index.html` y reemplazá la sección del panel administrador por:

```html
<div id="panel-admin" class="panel-role" style="display: none;">
  <h2>Panel Administrador</h2>
  <p>Gestión total del sistema.</p>

  <div class="form-section">
    <h3>Agregar nuevo empleado</h3>
    
    <form id="formulario-empleado">
      <div class="form-group">
        <label for="emp-nombre">Nombre completo</label>
        <input type="text" id="emp-nombre" placeholder="Ej: Juan Pérez" required>
      </div>

      <div class="form-group">
        <label for="emp-puesto">Puesto</label>
        <input type="text" id="emp-puesto" placeholder="Ej: Desarrollador" required>
      </div>

      <div class="form-group">
        <label for="emp-departamento">Departamento</label>
        <select id="emp-departamento" required>
          <option value="">-- Seleccionar --</option>
          <option value="IT">IT</option>
          <option value="Diseño">Diseño</option>
          <option value="Ventas">Ventas</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
          <option value="Finanzas">Finanzas</option>
        </select>
      </div>

      <div class="form-group">
        <label for="emp-salario">Salario (COP)</label>
        <input type="number" id="emp-salario" placeholder="Ej: 3000000" min="0" required>
      </div>

      <button type="button" id="btn-agregar-empleado" class="btn-primary">
        Agregar empleado
      </button>
    </form>

    <p id="mensaje-empleado" class="mensaje-resultado"></p>
  </div>
</div>
```

---

## Paso 3 — Agregar estilos para el formulario

Agregá al final de `styles.css`:

```css
.form-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.form-section h3 {
  margin-top: 0;
  color: #333;
  font-size: 18px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
  font-size: 14px;
}

.form-group input,
.form-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: Arial, sans-serif;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 5px rgba(67, 97, 238, 0.3);
}

.btn-primary {
  padding: 12px;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #3a52d4;
}

.mensaje-resultado {
  margin-top: 15px;
  padding: 12px;
  border-radius: 4px;
  display: none;
  text-align: center;
}

.mensaje-resultado.success {
  display: block;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.mensaje-resultado.error {
  display: block;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
```

---

## Paso 4 — Función para agregar empleado

En `app.js`, después de las funciones de sesión, agregá:

```js
function obtenerIdNuevo() {
  const empleados = JSON.parse(localStorage.getItem(CLAVE_EMPLEADOS)) || []
  if (empleados.length === 0) return 1
  return Math.max(...empleados.map(e => e.id)) + 1
}

function agregarEmpleado(nombre, puesto, departamento, salario) {
  const empleados = JSON.parse(localStorage.getItem(CLAVE_EMPLEADOS)) || []
  
  const nuevoEmpleado = {
    id: obtenerIdNuevo(),
    nombre: nombre,
    puesto: puesto,
    departamento: departamento,
    salario: parseInt(salario)
  }
  
  empleados.push(nuevoEmpleado)
  localStorage.setItem(CLAVE_EMPLEADOS, JSON.stringify(empleados))
  
  return nuevoEmpleado
}
```

---

## Paso 5 — Validar y agregar empleado

Agregá este event listener al final (antes de la verificación de sesión):

```js
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
```

---

## Paso 6 — Verificar en el navegador

1. Inicia sesión como `admin / admin123`
2. Deberías ver el formulario de "Agregar empleado"
3. Completa los campos y haz clic en "Agregar empleado"
4. Verifica que aparezca el mensaje de éxito
5. Abrí DevTools → Application → Local Storage → `gp_empleados` para ver los datos guardados

---

## Código de referencia

El flujo completo debería ser:
1. Usuario ingresa datos
2. Validamos cada campo
3. Si todo es correcto, creamos el empleado
4. Lo guardamos en `localStorage`
5. Mostramos éxito y limpiamos el formulario
6. Después de 3 segundos, limpiamos el mensaje

---

## Conceptos aprendidos

| Concepto | ¿Qué hace? |
|----------|-----------|
| `Math.max()` | Encuentra el número más grande en un array |
| `.map()` | Transforma cada elemento de un array |
| `parseInt()` | Convierte texto a número |
| `.push()` | Agrega un elemento al final del array |
| Validación incremental | Validar cada campo y retornar si hay error |
| Limpiar formulario | `input.value = ''` después de enviar |
| `setTimeout()` | Ejecutar código después de esperar X milisegundos |

---

## Desafío extra (opcional)

1. Agregá validación de que el nombre no esté vacío y tenga al menos 3 caracteres.
2. Mostrar un listado de empleados agregados debajo del formulario.
3. Que solo administradores vean este formulario (ya está con el `id="panel-admin"`).
4. Agregá un campo de email y validá que sea un email válido.

> **Pista para validar email**: Podés usar una expresión regular o simplemente verificar que contenga "@"
