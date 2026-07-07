# Architecture / Arquitectura

English:
The portal uses a small App Router structure to keep the access workflow readable. Route composition stays in `app/`, reusable UI blocks live in `components/`, and synthetic domain data lives in `lib/`.

Español:
El portal usa una estructura pequeña con App Router para que el flujo de acceso sea fácil de leer. La composición de rutas vive en `app/`, los bloques reutilizables en `components/` y los datos sintéticos en `lib/`.

## Layers / Capas

- `app/`: routing, layout, global styles / rutas, layout y estilos globales
- `components/`: panels, cards, timelines / paneles, tarjetas y líneas de tiempo
- `lib/`: mock access data / datos simulados de acceso

## Goal / Objetivo

English: Show a realistic access-control dashboard with approvals, roles, and audit evidence.

Español: Mostrar un panel realista de control de acceso con aprobaciones, roles y evidencia de auditoría.
