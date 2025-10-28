import {useState,useEffect} from 'react';
import './App.css';

function App() {
  /*=======================
           保持情報
  ========================= */
  const [title,setTitle] = useState('');
  const [review,setReview] = useState('');
  const [books,setBooks] = useState([]);
  const [rating,setRating] = useState(0);
  const [showLibrary,setShowLibrary] = useState(false); //本棚の表示管理
  const [added,setAdded] = useState(false);

  // ★編集用の情報
  const [editIndex,setEditIndex] = useState(null);
  const [editTitle,setEditTitle] = useState('');
  const [editReview,setEditReview] = useState('');
  const [editRating,setEditRating] = useState(0);


  /*=======================
      ローカルストレージ
  ========================= */
  // ★ページ読み込み時にローカルストレージを読み込む
  useEffect(() => {
    const savedBooks = localStorage.getItem('reasy-library');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // ★booksの変更のたびに、ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('reasy-library', JSON.stringify(books));
  }, [books]);


  /*=======================
           操作メソッド
  ========================= */
  // ★追加ボタン
  const handleClick = () => {
    if(title.trim() === '')
      return;
    const newBooks = {title,review,rating};
    setBooks([...books,newBooks]);
    setTitle('');
    setReview('');
    setRating(0);
    // ★追加メッセージ処理
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    },2000);
  }
  // ★削除ボタン
  const handleDelete = (deleteIndex) => {
    const newBooks = books.filter((_,index) => index !== deleteIndex);
    setBooks(newBooks);
  }
  // ★編集ボタン
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditTitle(books[index].title);
    setEditReview(books[index].review);
    setEditRating(books[index].rating);
  }

  // ★保存ボタン
  const handleSave = () => {
    const updateBooks = [...books];
    updateBooks[editIndex] = {title:editTitle,review:editReview,rating:editRating};
    setBooks(updateBooks);
    setEditIndex(null);
    setEditRating(0);
  }


  /*=======================
           表示画面
  ========================= */
  return(
    <div>
      <h1 className="logo">Reasy</h1>
      <div className="logo-line"></div>
      {/*==========================
              入力フォーム
      ===========================*/}
      <div className="input-form">
        <input className="titleStyle"
        type="text"
        value={title}
        placeholder="タイトルを入力"
        onChange = {(e) => {setTitle(e.target.value)}}
        />
        <br />
        <textarea className="reviewStyle"
        value={review}
        placeholder="感想を入力"
        onChange = {(e) => {setReview(e.target.value)}}
        />
        <br />
        <div className="rating-star">
          評価：
        {[1,2,3,4,5].map((num) => (
          <span key={num} onClick ={() => setRating(num)} >
           {rating >= num ? '★':'☆'}
          </span>
        ))}
        </div>
        <button onClick = {() => {handleClick()}}>本棚に追加</button>
        {/* 追加完了メッセージ */}
        {added && (
        <div className="added-msg">追加しました</div>
        )}
        </div>
    
       {/* ★本棚表示ボタン */}
       {!showLibrary &&(
         <div className="library-button" onClick = {() => {setShowLibrary(true)}}>
          📚本棚を開く
         </div>
      )}  

      {/*==========================
                 本  棚
      ===========================*/}
    {showLibrary && (
    <div className="library">
      <h2>📚本棚</h2>
      <ul className="book-list">
        {/*====================
              編集画面
        ===================== */}
       {books.map((book,index) => (
         <li key={index} className="book-card">
          {editIndex === index ? (
            <>
              <input
              value={editTitle}
              onChange = {(e) => setEditTitle(e.target.value)}
              />
              <textarea
              value={editReview}
              onChange = {(e) => setEditReview(e.target.value)}
              />
              <div>
               評価：
               {[1,2,3,4,5].map((num) => (
               <span  className="book-rating" key={num} onClick ={() => setEditRating(num)} >
                 {editRating >= num ? '★':'☆'}
               </span>
                ))}
              </div>
              <button onClick ={handleSave}>保存</button>
            </>
            ):
            /*=================
                本棚一覧
            ===================*/
            (
          <>
          <strong>{book.title}</strong>
          <br />
          <em>{book.review}</em>
          <br />
          <div className="book-rating">
            評価:
             {Array.from({length: 5}, (_, i) => (
             <span  className="book-rating" key={i}>
              {book.rating > i ? '★' : '☆'}
             </span>
             ))}
          </div>
          <button onClick = {() => handleEdit(index)}>編集</button>
          <button onClick = {() => handleDelete(index)}>削除</button>
          </>
          )}
        </li>
       ))}
      </ul>
      <button onClick = {() => {setShowLibrary(false)}}>本棚を閉じる</button>
    </div>
    )}
    </div>
  )
}

export default App;