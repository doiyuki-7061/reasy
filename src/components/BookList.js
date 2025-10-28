// components/BookList.js
import React from 'react';
import RatingStars from './RatingStars';


const BookList = ({
  books,
  showLibrary,
  setShowLibrary,
  editIndex,
  editTitle,
  editAuthor,
  editReview,
  editRating,
  setEditIndex,
  setEditTitle,
  setEditAuthor,
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
              <li key={book.id} className="book-card">
                {editIndex !== index ? (
                  <>
                    <strong>{book.title}</strong>
                    <br />
                    <em>{book.author}</em>
                    <br />
                    <em>{book.review}</em>
                    <br />
                    <RatingStars rating={book.rating} onChange={() => {}} />
                    <button onClick={() => handleEdit(index)}>編集</button>
                    <button onClick={() => handleDelete(index)}>削除</button>
                  </>
                ) : (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <br />
                    <input
                      value={editAuthor}
                      onChange={(e) => setEditAuthor(e.target.value)}
                    />
                    <br />
                    <textarea
                      value={editReview}
                      onChange={(e) => setEditReview(e.target.value)}
                    />
                    <br />
                    <RatingStars rating={editRating} onChange={setEditRating} />
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
