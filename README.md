# Proyecto Microservicios Productos

## Arquitectura

El proyecto está compuesto por 4 microservicios principales:

- **BFF (`bff-products`)**: expone los endpoints públicos y actúa como proxy hacia el facade.
- **Facade (`fcd-products`)**: centraliza la lógica de negocio, validación de tokens y orquestación de datos.
- **Integrations (`int-products-ms`, `int-category-ms`)**: microservicios de integración que se comunican con APIs externas o fuentes de datos.

La comunicación entre servicios se realiza vía HTTP y cada servicio corre en su propio contenedor Docker.

---

## Tecnologías y herramientas utilizadas

- **Node.js** (v22.17.0)
- **TypeScript**
- **Axios**: cliente HTTP para consumir APIs y Ms.
- **Docker & Docker Compose**: contenerización y orquestación de microservicios.
- **Prettier**: formateador automático de código para mantener estilo uniforme.
- **ESLint**: linter para asegurar buenas prácticas y evitar errores comunes en el código.
- **Husky**: hooks de Git para ejecutar linters y tests antes de commits.
- **Supertest**: integración sobre endpoints HTTP.
- **Jest**: tests unitarios e integración.
- **Swagger**: documentación de APIs REST.

---

## Instrucciones para correr el proyecto

### 1. Requisitos

- Docker y Docker Compose instalados
- Node.js V22.17.0(opcional, solo si quieres correr servicios y tests localmente)

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

Si quieres ver los logs en la terminal

```sh
docker-compose up
```

Esto levantará los 4 microservicios en los puertos:

- **BFF:** http://localhost:3003
- **Facade:** http://localhost:3002
- **Integrations:** http://localhost:3000 (productos), http://localhost:3001 (categorías)

### 4. Parar los servicios

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

## Documentación de endpoints

Puedes consultar la documentación Swagger de cada microservicio en `/swagger` (por ejemplo, http://localhost:3003/swagger para el BFF).

---

## Tests

Los tests están ubicados en `src/__tests__/` dentro de cada microservicio.

### Cobertura alcanzada y cómo correr los tests

Los tests de los dos microservicios que integran APIs externas no utilizan datos mockeados, sino que realizan peticiones HTTP reales para validar la correcta integración con dichas APIs. Esto permite detectar de forma temprana posibles cambios o errores en las respuestas de terceros que podrían afectar el funcionamiento del sistema.

En cambio, los tests del facade y del BBF utilizan datos mockeados. Esta decisión se basa en que ambos servicios consumen microservicios desarrollados internamente, cuyo comportamiento es conocido y controlado. Mockear sus respuestas permite ejecutar pruebas más rápidas y aisladas, sin depender de servicios externos. Además, ante cambios en los microservicios, es posible ajustar los mocks de forma controlada para garantizar que el facade o el BBF se adapten correctamente.

Para las pruebas de integración, se utiliza Supertest para enviar solicitudes HTTP y validar las respuestas de los endpoints expuestos por los microservicios.

Desde la raíz del proyecto, podés ejecutar los tests de cada microservicio de forma individual:

```sh
docker compose run --rm int-products-ms npm test
docker compose run --rm int-category-ms npm test
docker compose run --rm fcd-products npm test
docker compose run --rm bff-products npm test
```

O bien ejecutar todos los tests juntos:

```sh
docker compose run --rm int-products-ms npm test && \
docker compose run --rm int-category-ms npm test && \
docker compose run --rm fcd-products npm test && \
docker compose run --rm bff-products npm test
```

Comandos para ver la cobertura de los tests de forma individual, para cada microservicio:

```sh
docker compose run --rm int-products-ms npm test-coverage
docker compose run --rm int-category-ms npm test-coverage
docker compose run --rm fcd-products npm test-coverage
docker compose run --rm bff-products npm test-coverage
```

### Ver el reporte de coverage

Después de ejecutar los comandos de coverage, se genera un reporte HTML accesible en `/coverage/lcov-report/index.html` dentro del microservicio correspondiente. Podés abrir este archivo en tu navegador para visualizar el detalle de la cobertura línea por línea.