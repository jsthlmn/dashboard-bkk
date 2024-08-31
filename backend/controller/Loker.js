import Loker from "../model/modelLoker.js";

export const getAllLoker = async (req, res) => {
    try {
        const loker = await Loker.findAll();
        res.json(loker);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const getLokerById = async (req, res) => {
    try {
        const loker = await Loker.findAll({
            where: {
                id:req.params.id
            }
        });
        res.json(loker[0]);
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const createLoker = async (req, res) => {
    try {
        await Loker.create(req.body);
        res.json({
            "messege": "Loker Cerated"
        });
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const updateLoker = async (req, res) => {
    try {
        await Loker.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "messege": "Loker Updated"
        });
    } catch (error) {
        res.json({ messege: error.messege });
    }

}

export const deleteLoker = async (req, res) => {
    try {
        await Loker.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "messege": "Loker Deleted"
        });
    } catch (error) {
        res.json({ messege: error.messege });
    }

}