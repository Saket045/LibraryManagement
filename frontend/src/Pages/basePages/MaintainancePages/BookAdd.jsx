import { useState } from "react";

const BookAdd = () => {
  const [formData, setFormData] = useState({
    isbn: "",
    bookName: "",
    category: "",
    copies: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
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

        {/* Category */}
        <div>
          <label className="block text-gray-700">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Select a category</option>
            <option value="Science">Science</option>
            <option value="Fiction">Fiction</option>
            <option value="History">History</option>
            <option value="Children">Children</option>
            <option value="Personal Development">Personal Development</option>
          </select>
        </div>

        {/* Number of Copies */}
        <div>
          <label className="block text-gray-700">Number of Copies:</label>
          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookAdd;
