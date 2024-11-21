import { addEvent} from "../controllers/event.js"
import { eventValidation } from "../middlewares/event.js"
import express from "express"

const router = express.Router()

router.post('/', eventValidation ,addEvent)


export default router

