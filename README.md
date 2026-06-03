# Gestor de Personal

Proyecto integrador para la materia de programación con JavaScript. Consiste en una aplicación web que permite gestionar información de empleados: datos personales, horarios, asistencia y pagos.

## Objetivo de aprendizaje

Aplicar los conceptos fundamentales de JavaScript en un proyecto real:

- Manipulación del DOM
- Eventos y formularios
- Arrays, objetos y funciones
- Almacenamiento con `localStorage`
- Lógica de roles y permisos
- Renderizado dinámico de listas y tablas

## Tecnologías

- HTML5 semántico
- CSS3 (sin frameworks)
- JavaScript vanilla (sin librerías)

## Estructura del proyecto

```
11-13-admin-personal/
├── index.html       # Punto de entrada
├── app.js           # Lógica principal
├── styles.css       # Estilos
└── docs/
    └── PRD.MD       # Requerimientos del producto
```

## Cómo ejecutar

1. Clonar o descargar el repositorio
2. Abrir `index.html` en el navegador (no requiere servidor)

## Roles del sistema

| Rol | Acceso |
|-----|--------|
| Administrador | Control total, reportes, configuración |
| Supervisor | Gestión de equipo, horarios y asistencia |
| Empleado | Consulta de horarios, registro de asistencia y solicitudes |

## Estado del proyecto

- [x] Documentación inicial (README y PRD)
- [ ] Estructura HTML base
- [ ] Estilos y diseño
- [ ] Lógica de autenticación por rol
- [ ] Gestión de empleados (CRUD)
- [ ] Control de asistencia
- [ ] Gestión de pagos y nómina
