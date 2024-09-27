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
const FeedbackRouter = (0, express_1.Router)();
const feedbackFeedbackRouter = (0, express_1.Router)();
// Submit
//  feedbackFeedbackRouter.post('/', async (req: Request, res: Response): Promise<Response | void> => {
//   const { userId, productId, rating, comment } = req.body;
//   // Logging the incoming request body for debugging
//   console.log('Received data:', { userId, productId, rating, comment });
//   if (!userId || !productId || !rating || !comment) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }
//   try {
//     const newFeedback = await prisma.feedback.create({
//       data: {
//         userId,
//         productId,
//         rating,
//         comment,
//       },
//     });
//     console.log('New feedback created:', newFeedback); // Log success
//     return res.status(201).json(newFeedback);
//   } catch (error) {
//     console.error('Error during feedback submission:', error); // Log error
//     return res.status(500).json({ message: 'Error submitting feedback', error });
//   }
// });
// Get feedback for a product
FeedbackRouter.get('/product/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const feedbacks = yield prisma.feedback.findMany({
            where: { productId },
            include: { user: true },
        });
        res.status(200).json(feedbacks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error });
    }
}));
// Get feedback for a user
FeedbackRouter.get('/user/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const feedbacks = yield prisma.feedback.findMany({
            where: { userId },
            include: { product: true },
        });
        res.status(200).json(feedbacks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error });
    }
}));
// Calculate average rating for a product
FeedbackRouter.get('/average/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const feedbacks = yield prisma.feedback.findMany({
            where: { productId },
        });
        const averageRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) /
            feedbacks.length;
        res.status(200).json({ averageRating });
    }
    catch (error) {
        res.status(500).json({ message: 'Error calculating average rating', error });
    }
}));
exports.default = FeedbackRouter;
