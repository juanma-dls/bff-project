import express from "express";
import router from "../routes";
import morgan from 'morgan';
import swagger from "../../swagger";
import cors from "cors"
import { loggerMiddleware } from "../utils/middlewares/loggerMiddleware";

const server = express();

server.use(express.json());
server.use(morgan('combined'));

swagger("/swagger", server);

server.use(loggerMiddleware);

// Se podria crear un corsOptions en este caso para solo aceptar peticiones de un dominio especifico
server.use(cors());

server.use("/", router);

export default server;
