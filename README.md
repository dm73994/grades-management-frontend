# Grades Management Frontend

Frontend desarrollado con **React 19 + Vite + TypeScript** que consume la API REST de gestión de estudiantes, materias y calificaciones. Desarrollado como prueba técnica.

---

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| React 19 | Librería principal de UI |
| Vite | Bundler y servidor de desarrollo |
| TypeScript | Tipado estático |
| Axios | Cliente HTTP para consumo de la API |
| CSS | Estilos con diseño responsive |
| Docker | Contenedor para despliegue |

---

## Requisitos previos

- **Docker** instalado y corriendo
- El **backend** debe estar ejecutándose antes de levantar el frontend ([ver instrucciones del backend](https://github.com/dm73994/grades-management-backend))

---

## Decisiones de diseño y arquitectura

### Gestión de notas embebida en el listado de estudiantes

Se tomó la decisión de **no crear una sección independiente para la gestión de notas**. En cambio, estas funcionalidades se integraron directamente en el listado de estudiantes, permitiendo registrar y visualizar las calificaciones por materia desde el mismo contexto donde se consulta al alumno.

Esta decisión responde a un criterio de **experiencia de usuario**: separar las notas en una sección aparte habría obligado al usuario a navegar entre vistas para realizar acciones que conceptualmente pertenecen al mismo flujo. Al embeber las notas dentro del estudiante, las acciones están donde el usuario las espera, reduciendo fricciones innecesarias.

### Estructura del proyecto — Screaming Architecture

Se aplicó un scaffolding con **Screaming Architecture**, donde la estructura de carpetas comunica los dominios del negocio en lugar de los roles técnicos. Esto significa que al abrir el proyecto, lo primero que "grita" la estructura es `students`, `subjects` y `grades`, no `components`, `hooks` o `utils` de forma genérica.

Esta convención mejora la legibilidad y el onboarding, haciendo evidente de qué trata la aplicación con solo mirar los directorios.

### Manejo de errores del backend

Se implementó un manejo de errores personalizado alineado con las respuestas que envía la API. Los mensajes de error que retorna el backend (validaciones, conflictos, entidades no encontradas) se procesan y se muestran al usuario de forma legible, en lugar de exponer mensajes técnicos genéricos.

### Diseño responsive

La interfaz tiene un nivel de responsividad funcional que permite una interacción adecuada desde dispositivos móviles. Si bien no es un diseño mobile-first exhaustivo, es suficiente para que todas las funcionalidades sean accesibles y usables desde pantallas pequeñas, lo que agrega valor sin haber sido un requerimiento explícito.

---

## Paso 1 — Clonar el repositorio

```bash
git clone https://github.com/dm73994/grades-management-frontend.git
cd grades-management-frontend
```

---

## Paso 2 — Configurar las variables de entorno

La aplicación requiere un archivo `.env` en la raíz del proyecto antes de levantar el contenedor.

**Opción A — PowerShell (Windows):**
```powershell
New-Item .env -ItemType File; Set-Content .env "VITE_BACKEND_URL=http://localhost:7399/api/v1"
```

**Opción B — Bash (Linux / macOS):**
```bash
echo "VITE_BACKEND_URL=http://localhost:7399/api/v1" > .env
```

**Opción C — Manual:**

Crea un archivo llamado `.env` en la raíz del proyecto y agrega lo siguiente:

```env
VITE_BACKEND_URL=http://localhost:7399/api/v1
```

### Variables disponibles

| Variable | Descripción | Valor esperado |
|----------|-------------|---------------|
| `VITE_BACKEND_URL` | URL base de la API REST del backend | `http://localhost:7399/api/v1` |

> ⚠️ El prefijo `VITE_` es obligatorio para que Vite exponga la variable en el cliente. Sin él, la variable no será accesible en el código.

---

## Paso 3 — Levantar la aplicación

```bash
docker compose up -d --build
```

La aplicación estará disponible en:

```
http://localhost:4997
```

---

## Funcionalidades

### Estudiantes
La gestión de estudiantes es el centro de la aplicación. Desde el listado se accede a todas las acciones relacionadas, incluidas las notas:

- Listar todos los estudiantes
- Ver detalle de un estudiante
- Crear estudiante mediante formulario
- Editar datos de un estudiante
- Eliminar estudiante
- **Registrar nota** seleccionando la materia y el valor, directamente desde el perfil del estudiante
- **Visualizar notas por materia** en tabs dentro del listado, sin necesidad de navegar a otra sección

### Materias
- Listar todas las materias
- Crear materia mediante formulario
- Editar materia
- Eliminar materia

---

## Detener la aplicación

```bash
docker compose down
```

---

## Notas técnicas

- El frontend consume la API del backend en la URL definida en `VITE_BACKEND_URL`; asegúrate de que el backend esté corriendo antes de iniciar el frontend
- El archivo `.env` debe crearse **antes** de ejecutar `docker compose up`, ya que Vite lo lee en tiempo de build
- Si modificas el `.env` después del build, debes reconstruir el contenedor con `docker compose up -d --build`