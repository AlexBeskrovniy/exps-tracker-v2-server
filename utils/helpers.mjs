import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashData = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
}

export const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

export const countUserTotal = (arr) => {
    let total = 0;
    arr.forEach((money) => {
        total += money.money;
    });
    return total;
}