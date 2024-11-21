import { addAuthor} from "../controllers/author.js"

import express from "express"

const router = express.Router()


router.post('/', addAuthor)

export default router
