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
exports.getBorrow = exports.borrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrow_model_1.Borrow.create(req.body);
        const _a = borrow.toObject(), { _id } = _a, rest = __rest(_a, ["_id"]);
        const borrowBook = Object.assign({ _id }, rest);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowBook
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
        const orderedResult = getbook.map(item => ({
            book: item.book,
            totalQuantity: item.totalQuantity
        }));
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: orderedResult
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
