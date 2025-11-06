export const fetchBookInfo = async (title) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`
  );
  const data = await response.json();
  if (data.items && data.items.length > 0) {
    const book = data.items[0].volumeInfo;
    return {
      title: book.title,
      author: book.authors ? book.authors.join(', ') : '不明',
      thumbnail: book.imageLinks?.thumbnail || '',
    };
  } else {
    return null;
  }
};
