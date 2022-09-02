import { Category } from '../models/category.mjs';
import { Record } from '../models/record.mjs';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find( {} ).sort( {createdAt: -1} );
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
        const category = new Category({...req.body});
        await category.save();
        res
            .status(201)
            .json({...category._doc});
    } catch (err) {
        console.error(err)
        res.status(400).end();
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
        return res.status(400).end()
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
        return res.status(400).end();
        }
        
        await Record.updateMany({category: deleted._id}, {$unset: {category: 1}});
        
        return res.status(200).json({id: deleted._id});
    } catch (err) {
        console.error(err);
        res.status(400).end();
    }
}