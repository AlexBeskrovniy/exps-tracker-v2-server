import jwt from 'jsonwebtoken';
import { User } from '../models/user.mjs';

export const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id, {password: 0});

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