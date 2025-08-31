// src/components/ReviewCard.jsx
import React from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card fade-in">
      <h4>{review.fromUser}</h4>
      <p>Rating: {'⭐'.repeat(review.rating)}</p>
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
