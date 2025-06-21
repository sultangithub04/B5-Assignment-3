import express, { Application, Request, Response } from "express";
import bookRouter from "./router/book.router";
import borrowRouter from "./router/borrow.router";
export const app:Application = express()

app.use(express())
app.use(express.json())



app.use('/api/books', bookRouter)
app.use('/api/borrow', borrowRouter)



app.get('/', (req: Request, res: Response)=>{
    res.send("server is running")
})


