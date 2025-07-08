import express from "express";
import router from "../routes";
import morgan from 'morgan';

const server = express();

server.use(express.json({limit: "50mb"}));
server.use(morgan('combined'));

server.use("/", router);

export default server;
