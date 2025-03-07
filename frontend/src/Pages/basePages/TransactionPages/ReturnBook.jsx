import { useState } from "react";

const ReturnBook = () => {
  const [formData, setFormData] = useState({
    isbn: "",
    bookName: "",
    author: "",
    returnDate: new Date().toISOString().split("T")[0], // Default to today
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/transactions/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // If authentication is required
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Book returned successfully!");
        setFormData({
          isbn: "",
          bookName: "",
          author: "",
          returnDate: new Date().toISOString().split("T")[0],
        }); // Reset form
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error returning book:", error);
      alert("An error occurred while returning the book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Return a Book</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* ISBN */}
        <div>
          <label className="block text-gray-700">ISBN:</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Book Name */}
        <div>
          <label className="block text-gray-700">Book Name (Optional):</label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-gray-700">Author (Optional):</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        {/* Return Date */}
        <div>
          <label className="block text-gray-700">Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all"
        >
          Return Book
        </button>
      </form>
    </div>
  );
};

export default ReturnBook;
