import express from "express";
import router from "../routes";
import morgan from 'morgan';
import swagger from "../../swagger";

const server = express();

server.use(express.json());
server.use(morgan('combined'));

swagger("/swagger", server);

server.use("/", router);

export default server;
