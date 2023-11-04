import express, { json } from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import authRouter from "./routes/authRoutes.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json());

app.use("/auth", authRouter);

io.on("connect", (socket) => {});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
