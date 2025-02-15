import { useState } from "react";

const books = [
  { name: "Book One", author: "Author A", available: "Yes" },
  { name: "Book Two", author: "Author B", available: "No" },
  { name: "Book Three", author: "Author A", available: "Yes" },
  { name: "Book Four", author: "Author C", available: "No" },
  { name: "Book Five", author: "Author D", available: "Yes" },
  { name: "Book Six", author: "Author E", available: "No" },
  { name: "Book Seven", author: "Author F", available: "Yes" },
  { name: "Book Eight", author: "Author G", available: "No" },
  { name: "Book Nine", author: "Author H", available: "Yes" },
  { name: "Book Ten", author: "Author I", available: "No" },
  { name: "Book Eleven", author: "Author J", available: "Yes" },
  { name: "Book Twelve", author: "Author K", available: "No" },
  { name: "Book Thirteen", author: "Author L", available: "Yes" },
  { name: "Book Fourteen", author: "Author M", available: "No" },
  { name: "Book Fifteen", author: "Author N", available: "Yes" },
  { name: "Book Sixteen", author: "Author O", available: "No" },
  { name: "Book Seventeen", author: "Author P", available: "Yes" },
  { name: "Book Eighteen", author: "Author Q", available: "No" },
  { name: "Book Nineteen", author: "Author R", available: "Yes" },
  { name: "Book Twenty", author: "Author S", available: "No" }
];

const Availability = () => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleSearch = () => {
    const results = books.filter(
      (book) =>
        book.name.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(results);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Search Books</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by book name or author name"
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

      {/* Table for structured display */}
      {filteredBooks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border border-gray-300">Book Name</th>
                <th className="p-3 border border-gray-300">Author</th>
                <th className="p-3 border border-gray-300">Availability</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-3 border border-gray-300">{book.name}</td>
                  <td className="p-3 border border-gray-300">{book.author}</td>
                  <td
                    className={`p-3 border border-gray-300 font-bold ${
                      book.available === "Yes"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {book.available}
                  </td>
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
