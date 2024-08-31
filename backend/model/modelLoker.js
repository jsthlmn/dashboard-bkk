import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Loker = db.define('lowongan_pekerjaan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nama_perusahaan: {
        type:DataTypes.STRING
    },
    nama_loker: {
        type:DataTypes.STRING
    },
    deskripsi: {
        type:DataTypes.STRING
    },
    kualifikasi: {
        type:DataTypes.STRING
    },
    kualifikasi_2: {
        type:DataTypes.STRING
    },
    kualifikasi_3: {
        type:DataTypes.STRING
    },
    kualifikasi_4: {
        type:DataTypes.STRING
    },
    kualifikasi_5: {
        type:DataTypes.STRING
    },
    jadwal: {
        type:DataTypes.DATE
    }
}, {
    freezeTableName: true
});

export default Loker;