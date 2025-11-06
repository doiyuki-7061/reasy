// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { fetchBookInfo } from './utils/fetchBookInfo';

function App() {
/*=============================
            保持情報
===============================*/
 //入力フォーム情報
  const [title, setTitle] = useState(''); //書籍名
  const [author, setAuthor] = useState(''); //著者名
  const [review, setReview] = useState(''); //感想
  const [rating, setRating] = useState(0); //評価の値
  const [thumbnail,setThumbnail] = useState(''); //書影
  const [add, setAdd] = useState(false); //追加通知メッセージ
  //本棚リスト情報
  const [books, setBooks] = useState([]);
  //本棚の表示・非表示
  const [showLibrary, setShowLibrary] = useState(false);
  //編集時の保存情報
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editReview, setEditReview] = useState('');
  const [editRating, setEditRating] = useState(0);

/*=============================
    ローカルストレージ情報
===============================*/
  //ローカルストレージ情報取得
  useEffect(() => {
    const savedBooks = localStorage.getItem('reasy');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);
  //booksに作品が追加される度にストレージへ反映
  useEffect(() => {
    localStorage.setItem('reasy', JSON.stringify(books));
  }, [books]);
  

/*=============================
            操作関数
===============================*/
  //書籍追加
  const handleAddBooks = async () => {
    if (title.trim() === '') return;
    const result = await fetchBookInfo(title);
    if(result) {
    const newBook = {
      id: uuidv4(), 
      title:result.title, 
      author:result.author, 
      review, 
      rating,
      thumbnail: result.thumbnail };
    setBooks([...books, newBook]);
    setTitle('');
    setReview('');
    setRating(0);
    setAdd(true);
    setTimeout(() => setAdd(false), 2000);
   } else {
    alert('書籍が見つかりませんでした');
   }
  };
  //書籍削除
  const handleDelete = (deleteIndex) => {
    const newBooks = books.filter((_, index) => index !== deleteIndex);
    setBooks(newBooks);
  };
  //書籍編集
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(books[index].title);
    setEditReview(books[index].review);
    setEditRating(books[index].rating);
  };
  //編集内容保存
  const handleSave = () => {
    const updatedBooks = [...books];
    updatedBooks[editIndex] = {
      ...updatedBooks[editIndex],
      title: editTitle,
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
        review={review}
        rating={rating}
        setTitle={setTitle}
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
        editReview={editReview}
        editRating={editRating}
        setEditIndex={setEditIndex}
        setEditTitle={setEditTitle}
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
