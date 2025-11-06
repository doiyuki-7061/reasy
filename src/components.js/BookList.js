// components/BookList.js
import React from 'react';
import RatingStars from './RatingStars';


const BookList = ({
  books,
  showLibrary,
  setShowLibrary,
  editIndex,
  editTitle,
  editReview,
  editRating,
  setEditIndex,
  setEditTitle,
  setEditReview,
  setEditRating,
  handleEdit,
  handleDelete,
  handleSave
}) => {
  return (
    <>
      {!showLibrary && (
        <div className="library-button" onClick={() => setShowLibrary(true)}>
          📚本棚を開く
        </div>
      )}

      {showLibrary && (
        <div className="library">
          <h2>📚本棚</h2>
          <ul className="book-list">
            {books.map((book, index) => (
              <li key={book.id} className={editIndex === index ? "book-card editing" : "book-card"}>
                {editIndex !== index ? (
                  <>
                    <strong>{book.title}</strong>
                    {book.thumbnail && (
                      <img
                      className='book-thumbnail'
                      src = {book.thumbnail}
                      alt = {`${book.title}の表紙`}
                      />
                    )}
                    <br />
                    <em>{book.author}</em>
                    <br />
                    <em>{book.review}</em>
                    <br />
                    <RatingStars rating={book.rating} onChange={() => {}} className="book-list-stars" />
                    <br />
                    <button onClick={() => handleEdit(index)}>編集</button>
                    <button onClick={() => handleDelete(index)}>削除</button>
                  </>
                ) : (
                  <>
                    <input className='titleStyle'
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <br />
                    <textarea className='reviewStyle'
                      value={editReview}
                      onChange={(e) => setEditReview(e.target.value)}
                    />
                    <br />
                    <RatingStars rating={editRating} onChange={setEditRating} className="boodList-stars"/>
                    <br />
                    <button onClick={handleSave}>保存</button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowLibrary(false)}>本棚を閉じる</button>
        </div>
      )}
    </>
  );
};

export default BookList;
