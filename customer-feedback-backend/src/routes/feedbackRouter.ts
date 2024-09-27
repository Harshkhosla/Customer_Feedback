import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();
const FeedbackRouter = Router();
// Submit feedback
// FeedbackRouter.post('/', async (req: Request, res: Response) => {
//     const { userId, productId, rating, comment } = req.body;
  
//     if (!userId || !productId || !rating || !comment) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
  
//     try {
//       const newFeedback = await prisma.feedback.create({
//         data: {
//           userId,
//           productId,
//           rating,
//           comment,
//         },
//       });
//       return res.status(201).json(newFeedback);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Error submitting feedback', error });
//     }
//   });

// Get feedback for a product
FeedbackRouter.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { productId },
      include: { user: true },
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error });
  }
});

FeedbackRouter.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { userId },
      include: { product: true },
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error });
  }
});

FeedbackRouter.get('/average/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { productId },
    });

    const averageRating =
      feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) /
      feedbacks.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating average rating', error });
  }
});

export default FeedbackRouter;
