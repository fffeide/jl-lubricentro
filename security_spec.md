# Security Specification: JL Lubricentro

## 1. Data Invariants
1. **Public Read for Client Portals:** Clients access their service history and car records via plate (`patente`) or plate + DNI. Therefore, read access to `autos` and `servicios` is permitted publicly.
2. **Client Controlled Updates:** Unauthenticated/Client updates to an `Auto` document can ONLY modify specific client-managed fields (`nombre_titular`, `telefono_titular`, `familia_prompt_mostrado`, `recibir_aviso_service`, `fecha_aviso_service`, `datos_completados`) and CANNOT modify sensitive admin fields such as `puntos`, `kilometraje_actual`, `grupo_id`, or `es_vehiculo_empresa`.
3. **Admin Privilege:** Authenticated administrators (`request.auth != null`) can perform full create, read, update, delete operations on `autos`, `servicios`, `familias`, `grupos`, `miembros_grupos`, `productos`, `ventas`, `recompensas`, and `canjes`.
4. **Catalogue & Family Read:** Public users can read `productos` (for public catalogue) and verify family invitation codes in `familias`.
5. **No Blind Creation by Clients:** Unauthenticated clients can only create new cars through controlled registration schema (mandatory `patente`, `marca`, `modelo`, with `puntos == 0`).

## 2. The "Dirty Dozen" Payloads (Designed to Break Identity, Integrity, or State)
1. **Privilege Escalation on Auto Points:** Unauthenticated user sending `{ puntos: 999999 }` in an update to an Auto document. Must be rejected.
2. **Ghost Field Injection in Auto:** Unauthenticated user sending `{ es_vehiculo_empresa: true, role: 'admin' }` in an update. Must be rejected.
3. **Direct Service Modification by Public:** Unauthenticated user attempting to `update` or `delete` an existing `Servicio` record. Must be rejected.
4. **Creating Service Without Auth:** Unauthenticated user attempting to insert a fake `Servicio` record. Must be rejected.
5. **Overwriting Product Catalog:** Unauthenticated user attempting to `delete` or modify a `Producto`. Must be rejected.
6. **Altering Fidelity Config:** Unauthenticated user writing to `/config/fidelidad`. Must be rejected.
7. **Manipulating Canje Status:** Unauthenticated user attempting to set `realizado: true` on a `Canje`. Must be rejected.
8. **Forging Sales Transaction:** Unauthenticated user writing a `Venta` document. Must be rejected.
9. **Tampering with Corporate Group:** Unauthenticated user updating a `Grupo` or adding a `MiembroGrupo`. Must be rejected.
10. **Excessive String Length in Auto:** Writing an Auto with a 50KB string into `marca` to cause denial of wallet / memory overflow. Must be rejected.
11. **Injecting Malformed Document ID:** Writing to path `/autos/{autoId}` where `autoId` contains invalid characters or exceeding 128 chars. Must be rejected.
12. **Public Deletion of Auto:** Unauthenticated user calling `delete` on an Auto document. Must be rejected.

## 3. Test Runner Definition
Unit tests should execute under `@firebase/rules-unit-testing` or integration test suite to verify all dirty dozen operations return `PERMISSION_DENIED` and valid authenticated flows succeed.
