"use client"
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
    <div>
      <h1>Submit Feedback</h1>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        min="1"
        max="5"
      />
      <textarea
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleSubmitFeedback}>Submit Feedback</button>

      <h2>Feedback for Product {productId}</h2>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            {feedback.comment} - {feedback.rating} stars (by user {feedback.userId})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackPage;
