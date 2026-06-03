# Tarea 1 — Pantalla de Login

**Proyecto:** Gestor de Personal  
**Clase:** Introducción a JavaScript  
**Nivel:** Principiante  

---

## ¿Qué vas a construir hoy?

La pantalla de inicio de sesión del Gestor de Personal. El usuario va a ingresar su nombre y contraseña, y al hacer clic en el botón, la aplicación va a saludarlo por su nombre.

Así se ve el resultado final:

```
┌─────────────────────────────┐
│      Gestor de Personal     │
│                             │
│  Usuario: [____________]    │
│  Contraseña: [__________]   │
│                             │
│       [ Ingresar ]          │
└─────────────────────────────┘
```

Al hacer clic en "Ingresar" aparece un mensaje:  
> "Bienvenido, María"

---

## Paso 1 — Preparar el HTML

Abrí el archivo `index.html`. Vas a reemplazar todo lo que hay por esto:

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

  <div class="login-container">
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

  <script src="app.js"></script>
</body>
</html>
```

> **¿Por qué ponemos el `<script>` al final del `<body>`?**  
> Porque el navegador lee el HTML de arriba hacia abajo. Si ponemos el script al principio, JavaScript intentaría buscar los botones y campos antes de que existan. Al ponerlo al final, ya todo está creado cuando JS empieza a correr.

---

## Paso 2 — Darle estilo con CSS

Abrí `styles.css` y escribí lo siguiente:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 360px;
}

h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
  font-size: 20px;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #555;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #3a52d4;
}

#mensaje {
  margin-top: 16px;
  text-align: center;
  color: #4361ee;
  font-weight: bold;
}
```

Guardá el archivo y abrí `index.html` en el navegador. Deberías ver el formulario centrado con estilo. El botón todavía no hace nada — eso viene ahora.

---

## Paso 3 — Tu primer JavaScript

Abrí `app.js`. Acá es donde empieza la magia.

### 3.1 — Seleccionar elementos del HTML

JavaScript puede "agarrar" cualquier elemento del HTML para leerlo o modificarlo. Para eso usamos `document.querySelector()`.

Escribí esto en `app.js`:

```js
const boton = document.querySelector('#btn-ingresar')
const inputUsuario = document.querySelector('#usuario')
const parrafoMensaje = document.querySelector('#mensaje')
```

> **¿Qué hace `document.querySelector`?**  
> Le dice al navegador: "buscame el elemento que tiene este id". El `#` antes del nombre significa que es un id. Ahora `boton`, `inputUsuario` y `parrafoMensaje` son variables que apuntan a esos elementos del HTML.

Abrí la consola del navegador (F12 → Console) y escribí:

```
boton
```

Vas a ver que te muestra el elemento del botón. Eso confirma que JavaScript lo encontró.

---

### 3.2 — Escuchar el clic del botón

Ahora le vamos a decir al botón: "cuando alguien haga clic, ejecutá esta función".

Agregá esto debajo de lo anterior:

```js
boton.addEventListener('click', function() {
  console.log('¡El botón fue clickeado!')
})
```

Guardá, recargá el navegador, hacé clic en el botón y mirá la consola. Vas a ver el mensaje.

> **¿Qué es `addEventListener`?**  
> Es una función que "escucha" un evento. El primer parámetro (`'click'`) es el evento que espera. El segundo es la función que se ejecuta cuando ese evento ocurre. Esto se llama **función callback** — una función que se ejecuta cuando pasa algo.

---

### 3.3 — Leer el valor del input

Ahora vamos a leer lo que el usuario escribió en el campo de nombre.

Reemplazá el contenido de la función por esto:

```js
boton.addEventListener('click', function() {
  const nombre = inputUsuario.value
  console.log(nombre)
})
```

Escribí tu nombre en el campo, hacé clic y mirá la consola. Vas a ver tu nombre impreso.

> **`.value`** es la propiedad que tiene el input con el texto que escribió el usuario.

---

### 3.4 — Validar que no esté vacío

No queremos saludar a nadie si el campo está vacío. Agregamos una condición:

```js
boton.addEventListener('click', function() {
  const nombre = inputUsuario.value

  if (nombre === '') {
    parrafoMensaje.textContent = 'Por favor ingresá tu nombre.'
  } else {
    parrafoMensaje.textContent = 'Bienvenido, ' + nombre
  }
})
```

> **`if / else`**: Si el nombre está vacío (`=== ''`), mostramos un aviso. Si no, mostramos el saludo.  
> **`.textContent`**: Cambia el texto que se ve dentro de un elemento HTML.

---

### 3.5 — Usar template literals (forma moderna)

Hay una forma más clara de armar el mensaje. En vez de usar `+` para unir texto, usamos **template literals**:

```js
parrafoMensaje.textContent = `Bienvenido, ${nombre}`
```

> Los backticks `` ` `` (acento grave) abren un template literal. Todo lo que esté dentro de `${}` se convierte en texto automáticamente. Es más legible que concatenar con `+`.

Reemplazá la línea del `else` con esta versión y comprobá que funciona igual.

---

## Código final de `app.js`

```js
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
```

---

## Conceptos aprendidos hoy

| Concepto | ¿Qué hace? |
|----------|-----------|
| `document.querySelector()` | Busca y selecciona un elemento del HTML |
| `.value` | Lee el texto que escribió el usuario en un input |
| `.textContent` | Cambia el texto visible de un elemento |
| `addEventListener('click', fn)` | Ejecuta una función cuando el usuario hace clic |
| `if / else` | Toma una decisión según una condición |
| Template literals `` `Hola ${nombre}` `` | Une texto y variables de forma legible |

---

## Desafío extra (opcional)

Si terminaste antes de que termine la clase, intentá esto:

1. Si el campo de contraseña también está vacío, mostrá el mensaje: `"Completá todos los campos."`
2. Cambiá el color del texto del mensaje a rojo cuando hay un error, y verde cuando el login es correcto.

> **Pista para el punto 2**: podés cambiar el color con `parrafoMensaje.style.color = 'red'`
