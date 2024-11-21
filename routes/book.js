import { addBook, deleteBook, fetchBooks, getBookById, updateBook } from "../controllers/book.js"

import express from "express"

const router = express.Router()

router.get("/", fetchBooks)
router.get('/:id', getBookById)
router.post('/', addBook)
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router

