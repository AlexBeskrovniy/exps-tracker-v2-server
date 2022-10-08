import jwt from 'jsonwebtoken';
import { User } from '../models/user.mjs';
import mongoose from 'mongoose';

export const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id, { password: 0 });

            const sortedRecords = await User.aggregate([
                    { $match: { _id: mongoose.Types.ObjectId(decoded.id) } }, 
                    { $unwind: '$records' },
                    { $sort: { 'records.createdAt': -1 } },
                    { $group: { 
                        _id: '$_id',
                        records: { $push: '$records' }
                    } }
                ]);
                req.user.records = sortedRecords[0]?.records ? sortedRecords[0].records : [];

            next();
        } catch (err) {
            console.error(err);
            res.status(401).send({ message: "Not authorized" });
        }
    };

    if (!token) {
        res.status(401).send({ message: "Not authorized, no token" });
    }
}