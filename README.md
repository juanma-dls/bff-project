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
- Make (opcional)
- Node.js (opcional, solo si quieres correr servicios localmente)

### 2. Variables de entorno

Cada microservicio tiene su archivo `.env` donde debes definir los valores necesarios, por ejemplo:

- `TOKEN_VALIDO`
- `TOKEN_ALTERNATIVO`
- URLs de los servicios de integración

Asegúrate de completar los `.env` en cada carpeta de microservicio antes de levantar el proyecto. Esta informacion esta dispobible en los `.env.example` de cada microservicio

### 3. Levantar todos los servicios

Desde la raíz del proyecto con Docker Compose:

```sh
docker-compose build
docker-compose up -d
```
o directamente con Make en caso de tenerlo instalado:

```sh
make build
make up-d
```

Esto levantará los 4 microservicios en los puertos:

- **BFF:** http://localhost:3003
- **Facade:** http://localhost:3002
- **Integrations:** http://localhost:3000 (productos), http://localhost:3001 (categorías)

### 4. Parar los servicios

```sh
docker-compose down
```
o

```sh
make down
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

Los tests no utilizan datos mockeados, sino que realizan peticiones HTTP reales contra los microservicios. Por lo tanto, todos los microservicios deben estar previamente levantados mediante Docker Compose `make up-d` o `docker-compose up -d`.
Los tests utilizan Supertest para enviar las peticiones HTTP y validar las respuestas de los microservicios.

Podes correr los tests de los microservicios con:

```sh
docker-compose exec int-products-ms npm test
docker-compose exec int-category-ms npm test
docker-compose exec fcd-products npm test
docker-compose exec bff-products npm test
```

En el caso de tener make instalado podes correr todos los tests o de un microservicio específico:

```sh
make test-all
```

o

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
