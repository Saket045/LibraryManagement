import { useState } from "react";

const IssueBook = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <div className="container ml-8 mt-8 w-3/4 p-4 border rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold mb-4">Book Issue</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-semibold">Enter Book Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded-lg"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">Enter Author</label>
          <input
            type="text"
            className="border p-2 w-full rounded-lg"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">Issue Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded-lg"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-semibold">Return Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded-lg"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Issue Book
        </button>
      </form>
    </div>
  );
};

export default IssueBook;