import Category from "../models/category.js";

export const addCategory = async (req, res) => {
    console.log("body: ", req.body); // req.body est pour les requetes POST et PUT et DELETE pour envoyés les donnees JSON
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ model: category, message: "Objet créérrs !" });
};
