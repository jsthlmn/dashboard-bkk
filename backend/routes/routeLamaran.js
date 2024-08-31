import express from "express";

import {
    getAllLamaran,
    createLamaran,
    // getLamaranById,
    getLamaranByIdLoker,
    // updateLamaran,
    // deleteLamaran,
    getTotalLamaran
} from "../controller/Lamaran.js";

const router = express.Router();

router.get('/', getAllLamaran);
router.get('/total', getTotalLamaran);
// router.get('/:id', getLamaranById);
router.get('/loker/:id_loker', getLamaranByIdLoker);
router.post('/', createLamaran);
// router.patch('/:id', updateLamaran);
// router.delete('/:id', deleteLamaran);


export default router;