"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const book_router_1 = __importDefault(require("./router/book.router"));
const borrow_router_1 = __importDefault(require("./router/borrow.router"));
exports.app = (0, express_1.default)();
exports.app.use((0, express_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/api/books', book_router_1.default);
exports.app.use('/api/borrow', borrow_router_1.default);
exports.app.get('/', (req, res) => {
    res.send("server is running");
});
