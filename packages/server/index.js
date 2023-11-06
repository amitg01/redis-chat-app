import express, { json } from "express";
import { Server } from "socket.io";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import authRouter from "./routes/authRoutes.js";
import session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

const redisClient = new Redis();

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? "true" : "auto",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);

app.use("/auth", authRouter);

io.on("connect", (socket) => {});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
