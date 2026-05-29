# CV API

API REST en Node.js y Express para exponer información de un currículum con datos residentes en memoria.

## Requisitos

- Node.js 18 o superior
- npm 8 o superior

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
cd "Desarrollo web" && python3 -m http.server 4000

```

El servidor arranca en `http://localhost:3000` (puerto configurable vía la variable de entorno `PORT`). Puedes verificar el estado con `GET /health`, que responde con `{"message":"ok"}`.

## Rutas disponibles

| Recurso        | Endpoint base        | Métodos                                   | Descripción                                              |
|----------------|----------------------|-------------------------------------------|----------------------------------------------------------|
| Health         | `/health`            | `GET`                                     | Verifica la disponibilidad general del servicio          |
| Skills         | `/skills`            | `GET`, `POST`, `PATCH`, `DELETE`          | Gestiona habilidades técnicas                            |
| Experiences    | `/experiences`       | `GET`, `POST`, `PATCH`, `DELETE`          | Gestiona experiencias laborales                          |
| Education      | `/education`         | `GET`, `POST`, `PATCH`, `DELETE`          | Gestiona formación académica                             |
| Testimonials   | `/testimonials`      | `GET`, `POST`, `PATCH`, `DELETE`          | Gestiona testimonios y referencias profesionales         |

## Ejemplos de uso

### Skills

```http
# GET /skills 200
GET http://localhost:3000/skills

HTTP/1.1 200 OK
{
  "message": "ok",
  "data": [
    { "id": 1, "name": "JavaScript", "level": "Expert" },
    { "id": 2, "name": "Node.js", "level": "Advanced" },
    { "id": 3, "name": "TypeScript", "level": "Intermediate" }
  ]
}
```

```http
# GET /skills/999 404
GET http://localhost:3000/skills/999

HTTP/1.1 404 Not Found
{ "message": "not_found" }
```

```http
# POST /skills 201
POST http://localhost:3000/skills
Content-Type: application/json

{ "name": "React", "level": "Advanced" }

HTTP/1.1 201 Created
{
  "message": "ok",
  "data": { "id": 4, "name": "React", "level": "Advanced" }
}
```

```http
# POST /skills 422
POST http://localhost:3000/skills
Content-Type: application/json

{ "name": "", "level": "Guru" }

HTTP/1.1 422 Unprocessable Entity
{
  "message": "validation_error",
  "errors": [
    { "field": "name", "issue": "required" },
    { "field": "level", "issue": "invalid_level" }
  ]
}
 cambiar skills por /experience, /testimonials, /education