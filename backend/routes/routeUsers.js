import express from "express";
import { getUsers, Register } from "../controller/Users.js";
import { verifyToken } from "../midelware/VerifyToken.js";

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.post('/', Register);

export default router;