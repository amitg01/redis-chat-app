import { Router } from "express";
import validateForm from "../controllers/validateForm.js";

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  validateForm(req, res);
});

authRouter.post("/register", (req, res) => {
  validateForm(req, res);
});

export default authRouter;
