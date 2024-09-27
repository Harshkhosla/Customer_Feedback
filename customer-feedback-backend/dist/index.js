"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const feedbackRouter_1 = __importDefault(require("./routes/feedbackRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', userRouter_1.default);
app.use('/api/products', productRouter_1.default);
app.use('/api/feedback', feedbackRouter_1.default);
app.listen(3002);
