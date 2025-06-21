"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBook = exports.createBook = void 0;
const books_model_1 = require("../models/books.model");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.create(req.body);
        const _a = book.toObject(), { _id } = _a, rest = __rest(_a, ["_id"]);
        const orderedBook = Object.assign({ _id }, rest);
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            "data": orderedBook
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Validataion Failed',
            success: false,
            error
        });
    }
});
exports.createBook = createBook;
// export const createBook = async (req: Request, res: Response) => {
//   try {
//     const book = await Book.create(req.body);
//     const { _id, ...rest } = book.toObject();
//     const orderedBook = { _id, ...rest };
//     res.status(201).json({
//       success: true,
//       message: "Book created successfully",
//       data: orderedBook,
//     });
//   } catch (error)
//    {
//     if (error.name === 'ValidationError') {
//       const formattedErrors: Record<string, any> = {};
//       for (const field in error.errors) {
//         const err = error.errors[field];
//         formattedErrors[field] = {
//           message: err.message,
//           name: err.name,
//           properties: {
//             message: err.message,
//             type: err.properties?.type,
//             min: err.properties?.min,
//           },
//           kind: err.kind,
//           path: err.path,
//           value: err.value,
//         };
//       }
//       return res.status(400).json({
//         message: "Validation failed",
//         success: false,
//         error: {
//           name: "ValidationError",
//           errors: formattedErrors,
//         },
//       });
//     }
//     // generic fallback
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error,
//     });
//   }
// };
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        const query = {};
        if (typeof filter === 'string') {
            query.genre = filter;
        }
        const books = yield books_model_1.Book.find(query)
            .sort({ [sortBy]: sort === 'desc' ? -1 : 1 })
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: books
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch books",
            error
        });
    }
});
exports.getAllBook = getAllBook;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findById(req.params.bookId);
        if (!book)
            throw new Error('Book not found');
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Book not found',
            error
        });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        res.json({
            success: true,
            message: 'Book update successfully',
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Update failed',
            error
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield books_model_1.Book.findByIdAndDelete(req.params.bookId);
        res.json({ success: true, message: ' delete successfully', data: null });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Delete failed', error });
    }
});
exports.deleteBook = deleteBook;
