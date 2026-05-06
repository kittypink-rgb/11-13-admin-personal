# PRD — Gestor de Personal

> **Contexto educativo**: Este documento define los requerimientos del proyecto integrador de la materia de programación con JavaScript. El objetivo principal es aprender a construir una aplicación web funcional usando HTML, CSS y JS vanilla.

---

## 1. Descripción general

| Campo | Detalle |
|-------|---------|
| Nombre | Gestor de Personal |
| Tipo | Aplicación web (cliente, sin backend) |
| Tecnología | HTML5, CSS3, JavaScript vanilla |
| Almacenamiento | `localStorage` del navegador |

La aplicación permite organizar y gestionar información de empleados: datos personales, horarios, asistencia y pagos. Simula el panel administrativo de una empresa pequeña.

---

## 2. Objetivos del producto

- Automatizar la gestión de empleados, nóminas y asistencia dentro de la interfaz
- Facilitar la organización de datos por rol para evitar errores administrativos
- Proveer un historial consultable de asistencia y novedades por empleado

---

## 3. Roles y permisos

### Administrador
- Acceso total al sistema
- Generación de reportes
- Configuración de la plataforma (agregar/eliminar empleados)

### Supervisor
- Visualización del equipo a su cargo
- Gestión de horarios, registros de entrada/salida
- Aprobación de permisos e incapacidades

### Empleado
- Registro de su propia asistencia
- Solicitud de permisos o licencias
- Consulta de horario y novedades
- Visualización de historial personal

---

## 4. Funcionalidades requeridas

### 4.1 Autenticación por rol
- Pantalla de login con usuario y contraseña
- Redirección al panel correspondiente según el rol
- Los datos de usuarios se almacenan en `localStorage`

### 4.2 Gestión de empleados (solo Administrador)
- Listar todos los empleados registrados
- Crear, editar y eliminar empleados
- Cada empleado tiene: nombre, documento, rol, cargo y salario base

### 4.3 Control de asistencia
- Registro de entrada y salida por fecha
- Vista de asistencia mensual por empleado
- Indicador de ausencias y tardanzas

### 4.4 Gestión de pagos y nómina
- Cálculo de salario según días trabajados
- Descuentos automáticos por faltas
- Historial de pagos por empleado

---

## 5. Requerimientos técnicos

- **Sin frameworks**: todo debe escribirse en JavaScript puro
- **Sin librerías externas** (jQuery, Lodash, etc.)
- **Persistencia**: usar `localStorage` para guardar y recuperar datos
- **Responsive**: la interfaz debe verse bien en pantallas de escritorio y tablet
- **Separación de responsabilidades**: HTML para estructura, CSS para estilos, JS para lógica

---

## 6. Fases de desarrollo

| Fase | Contenido | Conceptos JS a practicar |
|------|-----------|--------------------------|
| 1 | Estructura HTML y estilos base | Ninguno (HTML/CSS) |
| 2 | Login y manejo de roles | `localStorage`, objetos, condicionales |
| 3 | CRUD de empleados | Arrays, funciones, DOM |
| 4 | Control de asistencia | Fechas, filtros, renderizado dinámico |
| 5 | Nómina y reportes | Cálculos, reducción de arrays, exportación |

---

## 7. Resumen

El producto sirve para controlar de manera sencilla la parte administrativa de una empresa, evitando riesgos de errores en pagos, gestión de personal y registros de asistencia. Como proyecto educativo, cada fase introduce nuevos conceptos de JavaScript aplicados a un problema real.
