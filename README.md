# Proyecto Microservicios Productos

## Arquitectura

El proyecto está compuesto por 4 microservicios principales:

- **BFF (`bff-products`)**: expone los endpoints públicos y actúa como proxy hacia el facade.
- **Facade (`fcd-products`)**: centraliza la lógica de negocio, validación de tokens y orquestación de datos.
- **Integrations (`int-products-ms`, `int-category-ms`)**: microservicios de integración que se comunican con APIs externas o fuentes de datos.

La comunicación entre servicios se realiza vía HTTP y cada servicio corre en su propio contenedor Docker.

---

## Instrucciones para correr el proyecto

### 1. Requisitos

- Docker y Docker Compose instalados
- Node.js (opcional, solo si quieres correr servicios localmente)

### 2. Variables de entorno

Cada microservicio tiene su archivo `.env` donde debes definir los valores necesarios, por ejemplo:

- `TOKEN_VALIDO`
- `TOKEN_ALTERNATIVO`
- URLs de los servicios de integración

Asegúrate de completar los `.env` en cada carpeta de microservicio antes de levantar el proyecto.

### 3. Levantar todos los servicios

Desde la raíz del proyecto:

```sh
make build
make up-d
```
o directamente con Docker Compose:

```sh
docker-compose build
docker-compose up -d
```

Esto levantará los 4 microservicios en los puertos:

- **BFF:** http://localhost:3003
- **Facade:** http://localhost:3002
- **Integrations:** http://localhost:3000 (productos), http://localhost:3001 (categorías)

### 4. Parar los servicios

```sh
make down
```
o
```sh
docker-compose down
```

---

## Descripción técnica del enfoque adoptado

- **BFF**: expone endpoints REST y reenvía las peticiones al facade, sin lógica de negocio ni validación de tokens.
- **Facade**: recibe las peticiones del BFF, valida el token (`TOKEN_VALIDO` para datos reales, `TOKEN_ALTERNATIVO` para mock), aplica lógica de negocio, orquesta llamadas a los microservicios de integración y unifica la respuesta.
- **Integrations**: microservicios desacoplados que se encargan de interactuar con APIs externas (por ejemplo, productos y categorías), devolviendo datos en el formato esperado por el facade.

**Ventajas del enfoque:**
- Separación clara de responsabilidades.
- Facilidad para mockear datos y testear flujos alternativos.
- Escalabilidad y mantenibilidad.

---

## Cobertura alcanzada y cómo correr los tests

### Cobertura

- Se proveen tests automáticos para los endpoints principales de cada microservicio.
- Los tests cubren:
  - Respuestas exitosas con `TOKEN_VALIDO`
  - Respuestas mockeadas con `TOKEN_ALTERNATIVO`
  - Errores por token inválido o ausente
  - Estructura de las respuestas (`paging`, `items`, etc.)

---

## Documentación de endpoints

- Puedes consultar la documentación Swagger de cada microservicio en `/swagger` (por ejemplo, http://localhost:3003/swagger para el BFF).

---

## Tests

### Cómo correr los tests

Se debe tener en cuenta que se deben tener los servicios levantados.

Puedes correr los tests de todos los microservicios con:

```sh
make test-all
```

O correr los tests de un microservicio específico:

```sh
make test-bff-products
make test-fcd-products
make test-int-products-ms
make test-int-category-ms
```

O bien, desde la carpeta de cada microservicio:

```sh
npm test
```

Los tests están ubicados en `src/__tests__/` dentro de cada microservicio.
