import { useState } from "react";

const BookEdit = () => {
  const [formData, setFormData] = useState({
    bookName: "",
    isbn: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Book Data:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Update Book Details</h2>
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

        {/* Status */}
        <div>
          <label className="block text-gray-700">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Select status</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
            <option value="Reserved">Reserved</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-all"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default BookEdit;
