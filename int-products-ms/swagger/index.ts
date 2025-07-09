import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    
    info: {
        title: 'int-products-ms',
        version: '1.0.0',
        description: 'Ms para la obtención de productos por parámetros y por categoría',
    },
    openapi: '3.0.2',
    servers: [
        {
           url: '/'
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ['swagger/docs/**/specification.yaml'],
};
const swaggerSpec = swaggerJSDoc(options);

export default (path: any, app: any) => app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));