/* eslint-disable no-unused-vars */
import { useState } from "react";

const Availability = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/books/search/${query}`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setFilteredBooks(data);
    } catch (err) {
      setError("Error fetching books. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Books</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by book name"
          className="border p-2 w-full rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {filteredBooks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border border-gray-300">Book Name</th>
                <th className="p-3 border border-gray-300">Author</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3 border border-gray-300">{book.bookName}</td>
                  <td className="p-3 border border-gray-300">{book.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-red-500 mt-4 text-center">No results found</p>
      )}
    </div>
  );
};

export default Availability;
