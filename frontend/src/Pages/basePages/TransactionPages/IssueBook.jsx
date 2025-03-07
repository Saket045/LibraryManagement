import { useState } from "react";

const IssueBook = () => {
  const [formData, setFormData] = useState({
    bookName: "",
    author: "",
    issueDate: new Date().toISOString().split("T")[0], // Default to today
    returnDate: new Date(new Date().setDate(new Date().getDate() + 15))
      .toISOString()
      .split("T")[0], // Default to 15 days later
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("/api/transactions/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // If authentication is required
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Book issued successfully!");
        setFormData({
          bookName: "",
          author: "",
          issueDate: new Date().toISOString().split("T")[0],
          returnDate: new Date(new Date().setDate(new Date().getDate() + 15))
            .toISOString()
            .split("T")[0],
        }); // Reset form
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error issuing book:", error);
      alert("An error occurred while issuing the book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Issue a Book</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Book Name */}
        <div>
          <label className="block text-gray-700">Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-gray-700">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Issue Date */}
        <div>
          <label className="block text-gray-700">Issue Date:</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
        >
          Issue Book
        </button>
      </form>
    </div>
  );
};

export default IssueBook;
