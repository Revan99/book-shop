import React, { useCallback, useEffect, useState } from "react";

import { getBooks } from "../../apis/booksApis";

import "./books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const getBooksData = useCallback(async (signal) => {
    try {
      const { data } = await getBooks(signal);
      setBooks(data);
      setError(null);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    getBooksData(abortController.signal);
    return () => abortController.abort();
  }, [getBooksData]);

  if (error) return <div>Something went wrong</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Books</h1>
        <label htmlFor="search" className="search-input">
          <input type="text" id="search" placeholder="search" />
        </label>
      </div>
      <div className="book-container">
        {books.map((book) => (
          <div className="book">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
