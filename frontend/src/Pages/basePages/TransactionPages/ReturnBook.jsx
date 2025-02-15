import { useState } from "react";

const ReturnBook = () => {
  const [isbn, setIsbn] = useState("");
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [ReturnDate, setReturnDate] = useState("");

  return (
    <div className="mt-8 ml-8 w-3/4 p-4">
      <h2 className="text-2xl font-bold mb-4">Book Return</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-bold">ISBN (Required)</label>
          <input
            type="text"
            className="border p-2 w-full rounded-lg"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-bold">Enter Book Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded-lg"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold">Enter Author</label>
          <input
            type="text"
            className="border p-2 w-full rounded-lg"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold">Return Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded-lg"
            value={ReturnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
       
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Return Book
        </button>
      </form>
    </div>
  );
};

export default ReturnBook;