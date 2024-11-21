import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import routerTasks from "./routes/task.js"
import routerAuth from "./routes/auth.js"
import routerBook from "./routes/book.js"
import routerAuthor from "./routes/author.js"
import routerCategory from "./routes/category.js"
import routerEvent from "./routes/event.js"

const app = express()
mongoose
    .connect("mongodb://localhost:27017/BDIsamm")
    .then(function () { console.log("connection reussie") })
    .catch(function (e) { console.log("connection échouée ") })

// const tasks = [
//     {
//         id: 1,
//         name: "task1"
//     },

//     {
//         id: 2,
//         name: "task2"
//     },
//     {
//         id: 3,
//         name: "task3"
//     }

// ]

app.use(cors()) // use est pour cree n'import quel middleware comme les middlewares GET et POST ... MAIS n'execute pas les requets qui suite apres use il faut utilisé NEXT 
app.use(express.json()) //sans cette commande on ne peut pas lire les donnees envoyées par le client sur le serveur car il sont pas en format JSON 

// app.use((req,res, next) => {
//     console.log("first")
//     next()
// })

// app.use((req,res, next) => {
//     res.status(200)


// })

// app.use((req, res, next) => {
//     res.json({message: "Hello World!"})
//     next()

// })

// app.use((req, res)=>{
//     console.log("second")

// })

// app.get('/api/tasks', (req, res) => {
//    const tasks=[
//     {
//         id:1,
//         name:"task1"
//     },

//     {
//         id:2,
//         name:"task2"
//     },
//     {
//         id:3,
//         name:"task3"
//     }

//     ]
//     res.status(200).json({data: tasks})
// })

// use create a middleware
//meme GET et USE
// app.get('/api/tasks/:id/users/:idUser', (req, res) => {
//     console.log("id: ", req.params.id)// req est un objet qui contient les parametres de la 
//     console.log("idUser: ", req.params.idUser)// 
//     res.status(200).json({ message: "success" })
// }
// )

app.use("/api/tasks", routerTasks)
app.use("/api/book", routerBook)
app.use("/api/author", routerAuthor)
app.use("/api/category", routerCategory)
app.use("/api/auth", routerAuth);
app.use("/api/event", routerEvent);

export default app