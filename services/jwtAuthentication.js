import jwt from "jsonwebtoken";
import { secret } from "../config/authConfig";

export function verifyToken(req, res) {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
    } catch (error) {
        return res.status(401).send({ message: "Unauthorized!" });
    }
}
