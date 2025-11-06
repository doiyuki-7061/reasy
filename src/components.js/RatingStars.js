// components/RatingStars.js
import React from 'react';

/*========================================================================
  評価機能コンポーネント
  ①呼び出し時に引数を受け取る
    引数①rating = rating または editRating
    引数②onChange = setRaiting または  setEditRating
  ②map処理
    --1～5の配列を引数numとして順番に受け取る
    --クリックされた値(rating)と処理中の値(num)を比較し、表示内容を変化
    --同じ値を２回クリックするとリセットできるよう処理
  ③使い分けができるよう、仮引数でクラス名を用意
===========================================================================*/
const RatingStars = ({ rating, onChange ,className=''}) => {
  return (
    <div className={`rating-star ${className}`} >
      評価：
      {[1, 2, 3, 4, 5].map((num) => (
        <span
          key={num}
          onClick={() => onChange(rating === num ? 0 : num)}
        >
          {rating >= num ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
