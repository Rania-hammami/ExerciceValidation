import http from "http"
import app from "./app.js"
const PORT = process.env.PORT || 5000
// import { app1} from "app" n"est pas mm nom si y a export const .....

const server = http.createServer(app)

server.listen(PORT, function(){
    console.log( 'Server is running on port ' + PORT)
})

//createServer accepte un callback qui a comme parametre request et response

// const server = http.createServer((req, res) => {
//   res.end("Voila ")
// })

// server.listen(process.env.PORT || 5000)


// export const SQRT = 10
// export const PI = 3.14

// export default function hello(){
//     console.log("Hello World!")
// }
