import express from "express";
import { Login } from "../controller/Users.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

router.post('/', Login);
router.get('/', refreshToken);

export default router;