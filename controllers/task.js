import Task from '../models/task.js'

export const fetchTasks = async (req, res) => {
    try{
    const tasks = await Task.find()// il accepte params pour filtrer les donnees
    res.status(200).json({ model: tasks, message: "success" })
}
catch(e){
    res.status(400).json({ 
        error:e.message,
        message: "Access problem",
     })
}
} 

export const createTask = async (req, res) => {
    try{
    console.log("body: ", req.body)
    const task = new Task(req.body)
    await task.save()

    res.status(201).json({ 
        model: task, 
        message: "Objet created !" 
    })
} catch (error) {
    res.status(400).json({ 
        error:error.message, 
        message: "Données invalides" 
    })
}}

export const updateTask = async (req, res) => {
    try{
    console.log("id: ", req.params.id)// req est un objet qui contient les parametres de la 
    console.log("body: ", req.body) // req.body est pour les requetes POST et PUT et DELETE pour envoyés les donnees JSON
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    )
    if (!task) {
        return res.status(404).json({ message: "Objet non trouvé" })
    } else {
        res.status(200).json({ model: task, message: "Objet trouvé et mis à jour" })
    }}
    catch (error) {
        res.status(400).json({ error:error.message})
}}

export const deleteTask = async (req, res) => {
    try{
    console.log("id: ", req.params.id)// req est un objet qui contient les parametres de la requete
    await Task.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "Objet deleted!" })
    } catch (error) {
        res.status(400).json({ error:error.message})
    }
}

export const getTaskById = async (req, res) => {
    try{
    console.log("id:", req.params.id)// req est un objet qui contient les parametres de la requete
    const task = await Task.findOne({ _id: req.params.id })
    if (!task) {
        return res.status(404).json({ message: "Objet non touvé" })
    } else {
        res.status(200).json({ model: task, message: "Objet trouvé" })
    } 
    }catch (error) {
        res.status(400).json({ error:error.message})
    }
}


