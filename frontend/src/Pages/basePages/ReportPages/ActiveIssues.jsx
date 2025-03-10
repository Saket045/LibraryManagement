import { useState,useEffect } from "react";

const ActiveIssues = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/transactions/issues"); 
        const data = await response.json();
        setIssuedBooks(data.transactions);
      } catch (error) {
        console.error("Error fetching issued books:", error);
      }
    };
    fetchIssuedBooks();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Issued Books</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">TransactionId</th>
              
              <th className="py-2 px-4 border">Date of Issue</th>
              <th className="py-2 px-4 border">Date of Return</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{book._id}</td>
               
                <td className="py-2 px-4 border">{book.issueDate.substring(0,10)}</td>
                <td className="py-2 px-4 border">{book.returnDate.substring(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveIssues;
