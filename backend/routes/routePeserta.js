import express from "express";

import {
    getAllPeserta,
    createPeserta,
    getPesertaById,
    updatePeserta,
    deletePeserta,
    getPesertaByIdLoker,
    pesertaApply,
    getPesertaRekap,
    getTotalPeserta
} from "../controller/Peserta.js";

const router = express.Router();

router.get('/', getAllPeserta);
router.get('/rekap', getPesertaRekap);
router.get('/total', getTotalPeserta);
router.get('/:id', getPesertaById);
router.post('/', createPeserta);
router.post('/loker/:id', pesertaApply);
router.patch('/:id', updatePeserta);
router.delete('/:id', deletePeserta);
router.get('/loker/:id', getPesertaByIdLoker);

export default router;