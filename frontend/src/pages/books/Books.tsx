import React, { useCallback, useEffect, useState } from "react";

import { getBooks } from "../../apis/booksApis";
import { bookType } from "../../types";

import "./books.css";

function Books() {
  const [books, setBooks] = useState<bookType[]>([]);
  const [error, setError] = useState<unknown | string>(null);

  const getBooksData = useCallback(async (signal: AbortSignal) => {
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
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
            </div>
            <h3>{book.title}</h3>
            <p>
              {book.desc.slice(0, 100)} {book.desc.length > 100 && "..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
