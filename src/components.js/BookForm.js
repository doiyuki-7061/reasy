// components/BookForm.js
import React from 'react';
import RatingStars from './RatingStars';

const BookForm = ({
  title,
  review,
  rating,
  setTitle,
  setReview,
  setRating,
  handleAddBooks,
  add
}) => {
  return (
    <div className="input-form">
      <input
        className="titleStyle"
        type="text"
        value={title}
        placeholder="タイトルを入力"
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        className="reviewStyle"
        value={review}
        placeholder="感想を入力"
        onChange={(e) => setReview(e.target.value)}
      />
      <br />
      <RatingStars rating={rating} onChange={setRating} />
      <br />
      <button onClick={handleAddBooks}>本棚に追加</button>
      {add && <div className="add-msg">追加しました</div>}
    </div>
  );
};

export default BookForm;
