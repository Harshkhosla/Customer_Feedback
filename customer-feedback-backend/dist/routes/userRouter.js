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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const UserRouter = (0, express_1.Router)();
UserRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const newUser = yield prisma.user.create({
            data: {
                name,
                email,
            },
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}));
UserRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersAll = yield prisma.user.findMany();
        res.status(200).json(usersAll);
    }
    catch (_a) {
        res.status(500).json({ err: "Internal Server Error" });
    }
}));
exports.default = UserRouter;
