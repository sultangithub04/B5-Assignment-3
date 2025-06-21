import express from "express"
import { borrowBook, getBorrow } from "../controller/borrow.controller"
const borrowRouter= express.Router()
borrowRouter.post('/', borrowBook)
borrowRouter.get('/', getBorrow)




export default borrowRouter