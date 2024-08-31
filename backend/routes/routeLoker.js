import express from "express";

import {
    getAllLoker,
    createLoker,
    getLokerById,
    updateLoker,
    deleteLoker
} from "../controller/Loker.js";


const router = express.Router();

router.get('/', getAllLoker);
router.get('/:id', getLokerById);
router.post('/', createLoker);
router.patch('/:id', updateLoker);
router.delete('/:id', deleteLoker);


export default router;