import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const FeedbackRouter = Router();
const feedbackFeedbackRouter = Router();

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
FeedbackRouter.get('/product/:productId', async (req: Request, res: Response) => {
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

// Get feedback for a user
FeedbackRouter.get('/user/:userId', async (req: Request, res: Response) => {
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

// Calculate average rating for a product
FeedbackRouter.get('/average/:productId', async (req: Request, res: Response) => {
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
