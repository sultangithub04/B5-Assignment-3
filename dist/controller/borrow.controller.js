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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrow = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrow_model_1.Borrow.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Validataion Failed',
            error
        });
    }
});
exports.borrowBook = borrowBook;
const getBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getbook = yield borrow_model_1.Borrow.aggregate([
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
                    _id: 0,
                    book: {
                        title: '$booksDetails.title',
                        isbn: '$booksDetails.isbn',
                    },
                    totalQuantity: 1
                },
            }
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: getbook
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch borrow book",
            error
        });
    }
});
exports.getBorrow = getBorrow;
