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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const ProductRouter = (0, express_1.Router)();
// Create a product
ProductRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        const newProduct = yield prisma.product.create({
            data: {
                name,
                description,
            },
        });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
}));
// Get all products
ProductRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
}));
exports.default = ProductRouter;
