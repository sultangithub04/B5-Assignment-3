"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controller/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.get('/', book_controller_1.getAllBook);
bookRouter.post('/', book_controller_1.createBook);
bookRouter.get('/:bookId', book_controller_1.getBookById);
bookRouter.put('/:bookId', book_controller_1.updateBook);
bookRouter.delete('/:bookId', book_controller_1.deleteBook);
exports.default = bookRouter;
