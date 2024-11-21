import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    date_debut: {
        type: Date,
        required: true,
    },
    date_fin: {
        type: Date,
        required: true,
    },
});

export default mongoose.model("Event", eventSchema);
