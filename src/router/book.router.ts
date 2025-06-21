import express from "express"
import { createBook, deleteBook, getAllBook, getBookById, updateBook } from "../controller/book.controller"
const bookRouter= express.Router()
bookRouter.get('/', getAllBook)
bookRouter.post('/', createBook)
bookRouter.get('/:bookId', getBookById)
bookRouter.put('/:bookId', updateBook)
bookRouter.delete('/:bookId', deleteBook)



export default bookRouter