import { useState } from "react";

const BookEdit = () => {
  const [bookName, setBookName] = useState("");
  const [copies, setCopies] = useState("");
  const [status, setStatus] = useState("");
  const [isBookFetched, setIsBookFetched] = useState(false);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookName}`);
      if (!response.ok) throw new Error("Book not found");

      const data = await response.json();
      setCopies(data.copies);
      setStatus(data.status);
      setIsBookFetched(true);
    } catch (error) {
      console.error("Error fetching book:", error);
      alert("Book not found!");
      setIsBookFetched(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ copies, status }),
      });

      if (!response.ok) throw new Error("Failed to update book");

      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Book</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Enter Book Name:</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>

      <button
        onClick={fetchBook}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
      >
        Fetch Book
      </button>

      {/* Show form only if book details are fetched */}
      {isBookFetched && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          {/* Copies */}
          <div>
            <label className="block text-gray-700">Copies:</label>
            <input
              type="number"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              min="1"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all"
          >
            Update Book
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEdit;
