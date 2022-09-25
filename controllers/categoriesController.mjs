import { Category } from '../models/category.mjs';
import { Record } from '../models/record.mjs';

export const getCategories = async (req, res) => {
    try {
        const categories = req.user.categories;
        console.log(categories);
        res
            .status(200)
            .json(categories);
    } catch (err) {
        console.error(err)
        res.status(400).end();
    }
};

export const createCategory = async (req, res) => {
    try {
        // const category = new Category({...req.body});
        // await category.save();
        req.user.categories.push(req.body);
        await req.user.save();
        res
            .status(201)
            .json({...req.body });
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const editedRecord = await Category.findOneAndUpdate(
            { _id: req.body.id }, 
            req.body, 
            { new: true }
        );

        if (!editedRecord) {
        return res.status(400).send({ message: err.message })
        }

        res.status(200).json({...editedRecord._doc});
    } catch (err) {
        console.error(err)
        res.status(400).end()
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findOneAndRemove({ _id: req.body.id });

        if (!deleted) {
        return res.status(400).send({ message: err.message });
        }
        
        await Record.updateMany({category: deleted._id}, {$unset: {category: 1}});
        
        return res.status(200).json({id: deleted._id});
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err.message });
    }
}