import Event from "../models/event.js";

export const addEvent = async (req, res) => {
    try {

        const newEvent = new Event(req.body);
        await newEvent.save();

        res.status(201).json({
            message: "Événement créé avec succès!",
            event: newEvent,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
