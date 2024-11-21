import mongoose from "mongoose";

const bookShema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    publicationDate: { type: Date, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

bookShema.path('author').validate(
    async function (value) {
        const authorBooks = await mongoose.model('Book').countDocuments({ author: value });
        return authorBooks > 0; 
    },
    "L'auteur doit avoir écrit au moins un livre avant." 
);

export default mongoose.model("Book", bookShema);
