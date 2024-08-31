import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import lokerRoutes from "./routes/routeLoker.js";
import pesertaRoutes from "./routes/routePeserta.js";
import usersRoutes from "./routes/routeUsers.js";
import usersLogin from "./routes/loginUsers.js";
import userLogout from "./routes/logoutUsers.js";
import lamaranRoutes from "./routes/routeLamaran.js";
import cors from "cors";
dotenv.config();

const app = express();

try {
    await db.authenticate();
    console.log('Database Connected..');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());

//loker

app.use(express.json());
app.use('/loker', lokerRoutes);


//peserta
app.use(express.json());
app.use('/peserta', pesertaRoutes);

//users
app.use(express.json());
app.use('/users', usersRoutes);

//login
app.use('/login', usersLogin);
app.use('/token', usersLogin);

//logout
app.use('/logout', userLogout);

// lamaran
app.use(express.json());
app.use('/lamaran', lamaranRoutes);

app.listen(5000, () => console.log('Server running at port 5000'));