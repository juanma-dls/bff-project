import express from "express";
import router from "../routes";
import morgan from 'morgan';
import swagger from "../../swagger";
import cors from "cors"
import { loggerMiddleware } from "../utils/middlewares/loggerMiddleware";

const server = express();

server.use(express.json({limit: "50mb"}));
server.use(morgan('combined'));

swagger("/swagger", server);

server.use(cors());

server.use(loggerMiddleware);

server.use("/", router);

export default server;
