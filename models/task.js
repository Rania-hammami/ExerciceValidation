import mongoose from "mongoose";

const taskShema = mongoose.Schema({
    title:{ type: String, required: true},
    duration:{ type: String, required: true},
})

export default mongoose.model("Task", taskShema)