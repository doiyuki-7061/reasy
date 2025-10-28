// components/RatingStars.js
import React from 'react';

const RatingStars = ({ rating, onChange }) => {
  return (
    <div className="rating-star">
      評価：
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => onChange(num)}
          style={{ cursor: 'pointer' }}
        >
          {rating >= num ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
