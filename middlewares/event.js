import Joi from "joi";

export const eventValidation = (req, res, next) => {
    const schema = Joi.object({
        titre: Joi.string().min(3).required().messages({
            "string.empty": "Le titre de l'événement est requis.",
            "string.min": "Le titre doit contenir au moins 3 caractères.",
        }),
        date_debut: Joi.date().greater('now').required().messages({
            "date.base": "La date de début doit être une date valide.",
            "date.greater": "La date de début doit être dans le futur.",
        }),
        date_fin: Joi.date().greater(Joi.ref('startDate')).required().messages({
            "date.base": "La date de fin doit être une date valide.",
            "date.greater": "La date de fin doit être après la date de début.",
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
