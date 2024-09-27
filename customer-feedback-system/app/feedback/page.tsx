"use client"; // Ensure the component runs on the client

import { useState, useEffect } from 'react';
import axios from '../../lib/axios';
import { Feedback } from '../../lib/types';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]); // Explicitly typing feedbacks array
  const [userId, setUserId] = useState<string>('');
  const [productId, setProductId] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`/feedback/product/${productId}`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedback', error);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.post('/feedback', { userId, productId, rating, comment });
      fetchFeedback(); // Refresh feedback list after submission
    } catch (error) {
      console.error('Error submitting feedback', error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchFeedback();
    }
  }, [productId]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 shadow-md rounded-md">
        <h1 className="text-2xl mb-4 font-bold">Submit Feedback</h1>

        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSubmitFeedback}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit Feedback
          </button>
        </div>

        <h2 className="text-xl mb-4 font-bold">Feedback for Product {productId}</h2>

        {/* Scrollable table for feedback */}
        <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">Comment</th>
                <th className="py-3 px-6 text-left">Rating</th>
                <th className="py-3 px-6 text-left">User ID</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {feedbacks.map((feedback) => (
                <tr key={feedback.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{feedback.comment}</td>
                  <td className="py-3 px-6 text-left">{feedback.rating} stars</td>
                  <td className="py-3 px-6 text-left">{feedback.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {feedbacks.length === 0 && (
          <p className="mt-4 text-gray-500">No feedback available for this product.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
