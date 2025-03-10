import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const role=useSelector((state)=>state.auth.user.role)
  return (
    <div className="container mx-auto p-6 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Library Management System</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl">
        Welcome to the Library Management System. Easily manage books, users, transactions, and reports in one place.
      </p>
      <nav className="flex space-x-6">
        {role === "admin" && (
          <Link to="/maintainance" className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-700">Maintenance</Link>
        )}
        <Link to="/report" className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-700">Reports</Link>
        <Link to="/transaction" className="text-white bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-700">Transactions</Link>
      </nav>
    </div>
  );
};

export default AdminPage;