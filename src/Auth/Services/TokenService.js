import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class TokenService {
    static isValid(token) {
        try {
            console.log(token);
            console.log(process.env.JWT_SECRET_KEY);
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }  
    }
}
