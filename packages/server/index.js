import express, { json } from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import authRouter from "./routes/authRoutes.js";

import {
  wrap,
  corsConfig,
  sessionMiddleware,
} from "./middleware/serverMiddleWare.js";
import authorizeUser from "./middleware/authorizeUser.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(json());
app.use(sessionMiddleware);
app.use(authorizeUser);

app.use("/auth", authRouter);

io.use(wrap(sessionMiddleware));
io.on("connect", (socket) => {
  console.log(socket.request.session.user.username);
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
