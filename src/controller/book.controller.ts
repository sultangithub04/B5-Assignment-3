import { Request, Response } from "express"
import { Book } from "../models/books.model"

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body)
    res.status(201).json({
      "success": true,
      "message": "Book created successfully",
      "data": book
    })


  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validataion Failed',
      error
    })
  }

}
export const getAllBook = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
    // const query: any={}
    // if(filter) {
    //   query.genre= filter;
    // }
    interface BookQuery {
      genre?: string;
    }

    const query: BookQuery = {};

    if (typeof filter === 'string') {
      query.genre = filter;
    }
    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'desc' ? -1 : 1 })
      .limit(Number(limit))

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: books
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
      error
    })
  }

}


export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) throw new Error('Book not found');
    res.json({
      success: true,
      message: 'Book retrieved successfully',
      data: book
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'Book not found',
      error
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    res.json({
      success: true,
      message: 'Book update successfully',
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Update failed',
      error
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({ success: true, message: ' delete successfully', data: null });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Delete failed', error });
  }
};
