import { Sequelize } from "sequelize";

const db = new Sequelize('bkk_smkn6', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;