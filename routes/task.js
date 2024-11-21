import { createTask, deleteTask, fetchTasks, getTaskById, updateTask } from "../controllers/task.js"
import { loggedMiddleware, isAdmin } from "../middlewares/auth.js"  

import express from "express"

const router = express.Router()

router.get("/", loggedMiddleware, isAdmin, fetchTasks)
router.get('/:id', getTaskById)
router.post('/', createTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router


// pour PATCH il suffit d'envoyer juste les donnees JSON que vous voulez les changés MAIS pour PUT il faut envoyer tout l'objet JSON AVEC tt les donnees de tt les champs