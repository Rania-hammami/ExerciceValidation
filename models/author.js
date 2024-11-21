import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    nationality: { type: String, required: true }
});
export default mongoose.model("Author", authorSchema);