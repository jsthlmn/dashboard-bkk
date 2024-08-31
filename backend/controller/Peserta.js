import db from "../config/database.js";
import Loker from "../model/modelLoker.js";
import Peserta from "../model/modelPeserta.js";

export const getAllPeserta = async (req, res) => {
    try {
        const peserta = await Peserta.findAll();
        res.json(peserta);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const getPesertaById = async (req, res) => {
    try {
        const peserta = await Peserta.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(peserta[0]);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const getPesertaByIdLoker = async (req, res) => {
    try {
        const peserta = await Peserta.findAll({
            where: {
                id_loker: req.params.id
            }
        });
        res.json(peserta);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const createPeserta = async (req, res) => {
    try {
        await Peserta.create(req.body);
        res.json({
            "messege": "Peserta Added"
        });
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const pesertaApply = async (req, res) => {
    try {
        await Peserta.create(req.body, {
            where: {
                id_loker: req.params.id
            }
        });
        res.json({
            "messege": "Loker Applied"
        })
    } catch (error) {
        res.json({ messege: error.messege });
    }
}

export const updatePeserta = async (req, res) => {
    try {
        await Peserta.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "messege": "Peserta Updated"
        });
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const deletePeserta = async (req, res) => {
    try {
        await Peserta.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "messege": "Peserta Deleted"
        });
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const getPesertaRekap = async (req, res) => {
    try {
        const peserta = await db.query('SELECT jadwal AS Jadwal, nama_loker AS Lowongan, nama_perusahaan AS Perusahaan, COUNT(id_loker) AS Jumlah_Peserta FROM peserta_seleksi JOIN lowongan_pekerjaan ON peserta_seleksi.id_loker = lowongan_pekerjaan.id GROUP BY id_loker')
        res.json(peserta[0]);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const getTotalPeserta = async (req, res) => {
    try {
        const peserta = await db.query('SELECT COUNT(id) AS Jumlah_Peserta FROM peserta_seleksi')
        res.json(peserta[0]);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}