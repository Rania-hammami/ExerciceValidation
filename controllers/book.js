import Book from "../models/book.js";

export const fetchBooks = async (req, res) => {
    const book = await Book.find();
    res.status(200).json({ model: book, message: "success" });
};

export const getBookById = async (req, res) => {
    console.log("id", req.params.id); // req est un objet qui contient les parametres de la requete
    const book = await Book.findOne({ _id: req.params.id });
    res.status(200).json({ model: book, message: "success" });
};


// export const addBook = async (req, res) => {
//     console.log("body: ", req.body); // req.body est pour les requetes POST et PUT et DELETE pour envoyés les donnees JSON
//     const book = new Book(req.body);
//     await book.save();
//     res.status(201).json({ model: book, message: "Objet créérrs !" });
// };

export const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body); 
        await newBook.validate(); 
        await newBook.save(); 

        res.status(201).json({ message: "Livre créé avec succès", book: newBook });
        
    } catch (error) {
            return res.status(400).json({ error: error.message });
        }

};




export const updateBook = async (req, res) => {
    console.log("id: ", req.params.id);
    console.log("body: ", req.body);
    const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
    });
    res.status(200).json({ message: "Objet modifié!" });
};
export const deleteBook = async (req, res) => {
    console.log("id: ", req.params.id);
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Objet supprimé!" });
};