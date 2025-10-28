// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [add, setAdd] = useState(false);

  const [books, setBooks] = useState([]);
  const [showLibrary, setShowLibrary] = useState(false);

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editReview, setEditReview] = useState('');
  const [editRating, setEditRating] = useState(0);

  useEffect(() => {
    const savedBooks = localStorage.getItem('reasy');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reasy', JSON.stringify(books));
  }, [books]);

  const handleAddBooks = () => {
    if (title.trim() === '') return;
    const newBook = { id: uuidv4(), title, author, review, rating };
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setReview('');
    setRating(0);
    setAdd(true);
    setTimeout(() => setAdd(false), 2000);
  };

  const handleDelete = (deleteIndex) => {
    const newBooks = books.filter((_, index) => index !== deleteIndex);
    setBooks(newBooks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(books[index].title);
    setEditAuthor(books[index].author);
    setEditReview(books[index].review);
    setEditRating(books[index].rating);
  };

  const handleSave = () => {
    const updatedBooks = [...books];
    updatedBooks[editIndex] = {
      ...updatedBooks[editIndex],
      title: editTitle,
      author: editAuthor,
      review: editReview,
      rating: editRating
    };
    setBooks(updatedBooks);
    setEditIndex(null);
    setEditRating(0);
  };

  return (
    <div>
      <h1 className="logo">Reasy</h1>
      <div className="logo-line"></div>

      <BookForm
        title={title}
        author={author}
        review={review}
        rating={rating}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setReview={setReview}
        setRating={setRating}
        handleAddBooks={handleAddBooks}
        add={add}
      />

      <BookList
        books={books}
        showLibrary={showLibrary}
        setShowLibrary={setShowLibrary}
        editIndex={editIndex}
        editTitle={editTitle}
        editAuthor={editAuthor}
        editReview={editReview}
        editRating={editRating}
        setEditIndex={setEditIndex}
        setEditTitle={setEditTitle}
        setEditAuthor={setEditAuthor}
        setEditReview={setEditReview}
        setEditRating={setEditRating}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
