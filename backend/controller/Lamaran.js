import db from "../config/database.js";
import Lamaran from "../model/modelLamaran.js";

export const getAllLamaran = async (req, res) => {
    try {
        const lamaran = await Lamaran.findAll();
        res.json(lamaran);
    } catch (error) {
        res.json({ messege: error.messege });
    }
}

export const getTotalLamaran = async (req, res) => {
    try {
        const lamaran = await db.query('SELECT COUNT(id) AS Total_Seleksi FROM lowongan_pekerjaan')
        res.json(lamaran[0]);
    } catch (error) {
        res.json({ messege: error.messege });
    }
}

// export const getLamaranById = async (req, res) => {
//     try {
//         const lamaran = await Lamaran.findAll({
//             where: {
//                 id:req.params.id
//             }
//         });
//         res.json(lamaran[0]);
//     } catch (error) {
//         res.json({ messege: error.messege });
//     }

// }

export const getLamaranByIdLoker = async (req, res) => {
    try {
        const lamaran = await Lamaran.findAll({
            where: {
                id_loker:req.params.id_loker
            }
        });
        res.json(lamaran);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const createLamaran = async (req, res) => {
    try {
        await Lamaran.create(req.body);
        res.json({
            "messege": "Lamaran Cerated"
        });
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

// export const updateLamaran = async (req, res) => {
//     try {
//         await Lamaran.update(req.body, {
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json({
//             "messege": "Lamaran Updated"
//         });
//     } catch (error) {
//         res.json({ messege: error.messege });
//     }

// }

// export const deleteLamaran = async (req, res) => {
//     try {
//         await Lamaran.destroy({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.json({
//             "messege": "Lamaran Deleted"
//         });
//     } catch (error) {
//         res.json({ messege: error.messege });
//     }

// }