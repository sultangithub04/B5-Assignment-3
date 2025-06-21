import { Request, Response } from "express"
import { Borrow } from "../models/borrow.model"



export const borrowBook = async (req: Request, res: Response) => {
    try {
        const borrow = await Borrow.create(req.body)
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validataion Failed',
            error
        })
    }

}
export const getBorrow = async (req: Request, res: Response) => {
    try {
        const getbook = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'booksDetails'
                }
            },
            {
                $unwind: '$booksDetails'

            },
            {
                $project: {
                    _id:0,
                    book: {
                        title: '$booksDetails.title',
                        isbn: '$booksDetails.isbn',
                    },
                    totalQuantity: 1
                },

            }

        ])
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: getbook
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch borrow book",
            error
        })
    }

}

