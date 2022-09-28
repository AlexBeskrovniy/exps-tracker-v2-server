import { countUserTotal } from '../utils/helpers.mjs';

export const getRecords = async (req, res) => {
    try {
        const records = req.user.records;
        const total = req.user.total;
        res
            .status(200)
            .json({ records, total });
    } catch (err) {
        console.error(err)
        res.status(400).end();
    }
}

export const createRecord = async (req, res) => {
    try {
        const category = req.user.categories.id(req.body.category);
        delete req.body.category;
        req.body.categoryID = category ? category._id : null;
        req.body.categoryName = category ? category.name : null;

        req.user.records.push(req.body);
        req.user.total = countUserTotal(req.user.records);
        await req.user.save();

        res.status(201).json({...req.body});
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err.message });
    }
}

export const updateRecord = async (req, res) => {
    try {
        const record = req.user.records.id(req.body.id);
        if (record) {
            record.createdAt = req.body.createdAt;
            record.money = req.body.money;
            record.description = req.body.description;

            const category = req.user.categories.id(req.body.category);
            record.categoryID = category ? category._id : null;
            record.categoryName = category ? category.name : null;
            req.user.total = countUserTotal(req.user.records);
            await req.user.save();
        }

        res.status(200).json({...req.body});
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err.message });
    }
}

export const deleteRecord = async (req, res) => {
    try {
        req.user.records.id(req.body.id).remove();
        req.user.total = countUserTotal(req.user.records);
        await req.user.save();
        
        return res.status(200).json({...req.body});
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err.message });
    }
}