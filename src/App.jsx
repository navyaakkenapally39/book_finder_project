import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) {
      setError("Please enter a book title");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      if (data.docs.length === 0) {
        setError("No books found. Try another title.");
      } else {
        setBooks(data.docs.slice(0, 10));
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>📚 Book Finder</h1>
      <div className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter book title..."
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results">
        {books.map((book) => (
          <div key={book.key} className="book-card">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <h3>{book.title}</h3>
            <p>{book.author_name?.[0] || "Unknown Author"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
