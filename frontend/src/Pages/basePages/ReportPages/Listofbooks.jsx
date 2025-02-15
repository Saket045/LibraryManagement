const books = [
  { isbn: "978-3-16-148410-0", name: "Book One", author: "Author A", category: "Fiction", status: "Available" },
  { isbn: "978-1-23-456789-7", name: "Book Two", author: "Author B", category: "Science", status: "Checked Out" },
  { isbn: "978-0-12-345678-9", name: "Book Three", author: "Author C", category: "History", status: "Available" }
];

const Listofbooks = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">List of Books</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ISBN</th>
              <th className="py-2 px-4 border">Name of Book</th>
              <th className="py-2 px-4 border">Author Name</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{book.isbn}</td>
                <td className="py-2 px-4 border">{book.name}</td>
                <td className="py-2 px-4 border">{book.author}</td>
                <td className="py-2 px-4 border">{book.category}</td>
                <td className="py-2 px-4 border">{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listofbooks;
