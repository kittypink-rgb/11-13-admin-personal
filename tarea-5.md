# Tarea 5 — Listar, editar y eliminar empleados (Read/Update/Delete)

**Proyecto:** Gestor de Personal  
**Clase:** Introducción a JavaScript  
**Nivel:** Intermedio - Avanzado

---

## Objetivo de esta tarea

Crear una tabla para listar todos los empleados con botones para editar y eliminar. Esto completa el ciclo CRUD.

- Mostrar todos los empleados en una tabla
- Implementar botón de editar (modificar datos)
- Implementar botón de eliminar (confirmar antes)
- Actualizar `localStorage` con los cambios
- Refrescar la tabla automáticamente después de cambios

---

## Paso 1 — Agregar tabla HTML

En `index.html`, dentro de `id="panel-admin"`, después de la sección del formulario, agregá:

```html
<div class="table-section">
  <h3>Lista de empleados</h3>
  
  <table id="tabla-empleados" class="tabla-empleados">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Puesto</th>
        <th>Departamento</th>
        <th>Salario</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="cuerpo-tabla">
      <!-- Se llena con JavaScript -->
    </tbody>
  </table>

  <p id="sin-empleados" class="sin-datos">No hay empleados registrados.</p>
</div>
```

---

## Paso 2 — Agregar estilos de tabla

En `styles.css`, agregá al final:

```css
.table-section {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.table-section h3 {
  margin-top: 0;
  color: #333;
  font-size: 18px;
}

.tabla-empleados {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 14px;
}

.tabla-empleados thead {
  background-color: #4361ee;
  color: white;
}

.tabla-empleados th,
.tabla-empleados td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabla-empleados tbody tr:hover {
  background-color: #f5f5f5;
}

.tabla-empleados tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.btn-grupo {
  display: flex;
  gap: 8px;
}

.btn-editar,
.btn-eliminar {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: opacity 0.3s;
}

.btn-editar {
  background-color: #fbbf24;
  color: white;
}

.btn-editar:hover {
  background-color: #f59e0b;
}

.btn-eliminar {
  background-color: #ef476f;
  color: white;
}

.btn-eliminar:hover {
  background-color: #d63654;
}

.sin-datos {
  text-align: center;
  color: #999;
  padding: 20px;
  font-style: italic;
}

/* MODAL PARA EDITAR */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  margin: 5% auto;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-modal {
  font-size: 28px;
  font-weight: bold;
  color: #999;
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-modal:hover {
  color: #000;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-guardar,
.btn-cancelar {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
}

.btn-guardar {
  background-color: #4361ee;
  color: white;
}

.btn-guardar:hover {
  background-color: #3a52d4;
}

.btn-cancelar {
  background-color: #ccc;
  color: #333;
}

.btn-cancelar:hover {
  background-color: #bbb;
}
```

---

## Paso 3 — Agregar modal de edición en HTML

En `index.html`, antes de cerrar el `</body>`, agregá:

```html
<!-- MODAL PARA EDITAR EMPLEADO -->
<div id="modal-editar" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Editar empleado</h2>
      <button class="close-modal">&times;</button>
    </div>

    <form id="formulario-editar">
      <div class="form-group">
        <label for="edit-nombre">Nombre</label>
        <input type="text" id="edit-nombre" required>
      </div>

      <div class="form-group">
        <label for="edit-puesto">Puesto</label>
        <input type="text" id="edit-puesto" required>
      </div>

      <div class="form-group">
        <label for="edit-departamento">Departamento</label>
        <select id="edit-departamento" required>
          <option value="IT">IT</option>
          <option value="Diseño">Diseño</option>
          <option value="Ventas">Ventas</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
          <option value="Finanzas">Finanzas</option>
        </select>
      </div>

      <div class="form-group">
        <label for="edit-salario">Salario</label>
        <input type="number" id="edit-salario" required>
      </div>

      <div class="modal-buttons">
        <button type="button" class="btn-guardar" id="btn-guardar-edicion">
          Guardar cambios
        </button>
        <button type="button" class="btn-cancelar" id="btn-cancelar-edicion">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</div>
```

---

## Paso 4 — Funciones para leer, editar y eliminar

En `app.js`, después de `agregarEmpleado()`, agregá:

```js
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
```

---

## Paso 5 — Función para renderizar tabla

Agregá esta función:

```js
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
```

---

## Paso 6 — Funciones para modal de edición

Agregá:

```js
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
```

---

## Paso 7 — Event listeners para modal

Agregá al final (antes de la verificación de sesión):

```js
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
```

---

## Paso 8 — Llamar a renderizar al mostrar dashboard

Modificá la función `mostrarDashboard()` para que llame a `renderizarTablaEmpleados()` cuando es admin:

```js
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
```

---

## Paso 9 — Verificar en el navegador

1. Inicia sesión como `admin / admin123`
2. Deberías ver la tabla con los 2 empleados iniciales
3. Prueba:
   - Agregar un nuevo empleado (usá el formulario anterior)
   - Editar: clic en "Editar", modifica datos, clic en "Guardar cambios"
   - Eliminar: clic en "Eliminar", confirma
4. La tabla debería actualizarse automáticamente después de cada acción

---

## Conceptos aprendidos

| Concepto | ¿Qué hace? |
|----------|-----------|
| `.filter()` | Crea un nuevo array sin los elementos que cumplen la condición |
| `.find()` | Busca el primer elemento que cumple la condición |
| `.forEach()` | Repite una acción para cada elemento del array |
| `document.createElement()` | Crea un elemento HTML nuevo |
| `.appendChild()` | Agrega un elemento al final de otro |
| `.innerHTML` | Reemplaza el contenido HTML |
| `.toLocaleString()` | Formatea números con separadores (1.000) |
| Modal | Ventana emergente para editar |
| `confirm()` | Muestra un cuadro de diálogo de confirmación |

---

## Desafío extra (opcional)

1. Agregar una columna de "Acciones" con dropdown (menú desplegable) en vez de botones lado a lado.
2. Que solo administradores vean los botones de editar/eliminar (ya está implementado con `panel-admin`).
3. Agregá un buscador para filtrar empleados por nombre.
4. Mostrar el salario formateado con símbolo de moneda ($) y separadores de miles.
5. Agregar validación de que el salario sea mayor a 0 antes de guardar cambios.

> **Pista para punto 3**: Podés crear un input de búsqueda y usar `.filter()` para mostrar solo los que coinciden con la búsqueda.
