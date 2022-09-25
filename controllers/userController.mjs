import bcrypt from 'bcryptjs';
import { User } from '../models/user.mjs';
import { hashData, generateJWT } from '../utils/helpers.mjs';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashData(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword   
        });
        if(!user) {
            res.status(400).send({ message: err.message });
        }
        res
            .status(201)
            .json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token: generateJWT(user._id)
            });
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))) {
            res.status(200).send({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    categories: user.categories,
                    records: user.records,
                    total: user.total
                },
                token: generateJWT(user._id)
            });
        } else {
            res.status(400).send({ message: "Invalid credentials" });
        }
    } catch(err) {
        console.error(err)
        res.status(400).send({ message: err.message });
    }
}

export const checkAuth = async (req, res) => {
    console.log(req.user);
    res.status(200).json(req.user);
}