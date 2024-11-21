import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Joi from "joi";
import { JWT_SECRET } from "../controllers/auth.js";

// Middleware de validation Joi
export const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.empty": "L'email est requis.",
            "string.email": "L'email n'est pas valide.",
        }),
        password: Joi.string().min(6).required().messages({
            "string.empty": "Le mot de passe est requis.",
            "string.min": "Le mot de passe doit contenir au moins 6 caractères.",
        }),
        role: Joi.string()
            .valid("admin", "user")
            .default("user")
            .messages({
                "any.only": "Le rôle doit être soit 'admin' soit 'user'.",
            }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            errors: error.details.map((err) => err.message),
        });
    }
    next();
};

// Middleware pour vérifier si l'utilisateur est connecté
export const loggedMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "User doesn't exist" });
        }

        req.auth = {
            userId: userId,
            role: user.role,
        };
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

// Middleware pour vérifier si l'utilisateur est admin
export const isAdmin = (req, res, next) => {
    try {
        if (!req.auth) {
            return res.status(401).json({ error: "Authorization information is missing" });
        }

        if (req.auth.role === "admin") {
            next();
        } else {
            res.status(403).json({ error: "No access to this route" });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
