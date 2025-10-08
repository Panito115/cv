# CV API

Pequeña API en Node.js y Express pensada para servir datos de un currículum.

## Requisitos

- Node.js 18 o superior

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm run dev
```

El servidor se inicia en `http://localhost:3000` (puerto configurable vía `PORT`). El endpoint `GET /health` responde con `{"message":"ok"}` para verificar el estado del servicio.
