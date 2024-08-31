import express from "express";
import { Logout } from "../controller/Users.js";

const router = express.Router();

router.delete('/', Logout);

export default router;