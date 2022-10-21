import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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

  console.log(books);

  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <h1>Book-store</h1>
          <ul className="navigation">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/add">Add</NavLink>
            </li>
          </ul>
        </div>
        <div className="page-header">
          <h1>Books</h1>
          <label htmlFor="search" className="search-input">
            <input type="text" id="search" placeholder="search" />
          </label>
        </div>
        <div className="book-container">
          {books.map((book) => (
            <div className="book" key={book.id}>
              <div className="book-cover">
                <img
                  src={"http://localhost:8080/" + book.cover}
                  alt={book.title}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h3>{book.title}</h3>
                <h3>{book.price}$</h3>
              </div>
              <p>
                {book.desc.slice(0, 100)} {book.desc.length > 100 && "..."}
              </p>
              <Link
                style={{ alignSelf: "center" }}
                to={`/${book.id}`}
                state={{
                  title: book.title,
                  desc: book.desc,
                  price: book.price,
                }}
              >
                <button>update</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
