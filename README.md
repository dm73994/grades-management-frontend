# Notas App - Frontend

Frontend desarrollado en React 19 con Vite, que consume la API REST de gestión de alumnos, materias y notas.

## Tecnologías
- React 19
- Vite
- TypeScript
- Axios
- HTML y CSS
- Docker

## Requisitos previos
- Docker instalado y corriendo

## Instalación y ejecución

**1. Clonar el repositorio**
```bash
git clone https://github.com/dm73994/grades-management-frontend.git
cd grades-management-frontend
```

**2. Crear el archivo de variables de entorno**

Windows (PowerShell):
```powershell
New-Item .env -ItemType File; Set-Content .env "VITE_BACKEND_URL=http://localhost:7399/api/v1"
```

Linux / Mac:
```bash
echo "VITE_BACKEND_URL=http://localhost:7399/api/v1" > .env
```

-- Tmabien puedes crearlo de forma manual, crear un archivo llamado ".env" en la raiz del projecto y copia lo siguiente
"VITE_BACKEND_URL=http://localhost:7399/api/v1"

**3. Levantar la aplicación**
```bash
docker compose up -d --build
```

La aplicación estará disponible en:
http://localhost:4997

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_BACKEND_URL` | URL base de la API REST | `http://localhost:7399/api/v1` |

## Funcionalidades

### Estudiantes
- Listar todos los estudiantes con sus notas por materia en tabs
- Ver detalle de un estudiante
- Crear estudiante mediante formulario
- Editar estudiante
- Eliminar estudiante
- Registrar nota a un estudiante seleccionando la materia y el valor
- Visualizar nota por materia directamente en el listado

### Materias
- Listar todas las materias
- Crear materia mediante formulario
- Editar materia
- Eliminar materia

## Detener la aplicación
```bash
docker compose down
```