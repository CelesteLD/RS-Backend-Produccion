import { TokenService } from "../Services/TokenService.js";

export const TokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!TokenService.isValid(token)) {
        return res.status(403).send({ message: 'Token inválido' });
    }

    next();
};