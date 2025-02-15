const issuedBooks = [
  { isbn: "978-3-16-148410-0", name: "Book One", memberId: "M001", issueDate: "2024-01-10", returnDate: "2024-02-10", delay: 5 },
  { isbn: "978-1-23-456789-7", name: "Book Two", memberId: "M002", issueDate: "2024-01-15", returnDate: "2024-02-18", delay: 3 },
  { isbn: "978-0-12-345678-9", name: "Book Three", memberId: "M003", issueDate: "2024-01-20", returnDate: "2024-02-25", delay: 7 }
];

const finePerDay = 10; // Assuming fine is 10 units per day of delay

const OverdueReturns = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Issued Books with Fine Calculation</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ISBN</th>
              <th className="py-2 px-4 border">Name of Book</th>
              <th className="py-2 px-4 border">Membership ID</th>
              <th className="py-2 px-4 border">Date of Issue</th>
              <th className="py-2 px-4 border">Date of Return</th>
              <th className="py-2 px-4 border">Delay (Days)</th>
              <th className="py-2 px-4 border">Fine Calculation</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{book.isbn}</td>
                <td className="py-2 px-4 border">{book.name}</td>
                <td className="py-2 px-4 border">{book.memberId}</td>
                <td className="py-2 px-4 border">{book.issueDate}</td>
                <td className="py-2 px-4 border">{book.returnDate}</td>
                <td className="py-2 px-4 border">{book.delay}</td>
                <td className="py-2 px-4 border">Rs.{book.delay * finePerDay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverdueReturns;
