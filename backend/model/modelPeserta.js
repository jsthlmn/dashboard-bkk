import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Loker from "../model/modelLoker.js";

const { DataTypes } = Sequelize;

const Peserta = db.define('peserta_seleksi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama: {
        type: DataTypes.STRING
    },
    alamat: {
        type: DataTypes.STRING
    },
    tgl_lahir: {
        type: DataTypes.DATE
    },
    jurusan: {
        type: DataTypes.STRING
    },
    no_telp: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    id_loker: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true
});

Loker.hasMany(Peserta, { foreignKey: 'id_loker' });
Peserta.belongsTo(Loker, { foreignKey: 'id_loker' });

export default Peserta;