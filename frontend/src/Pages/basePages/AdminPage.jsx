import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const data = [
  { from: "SC(B/M)000001", to: "SC(B/M)000004", category: "Science" },
  { from: "EC(B/M)000001", to: "EC(B/M)000004", category: "Economics" },
  { from: "FC(B/M)000001", to: "FC(B/M)000004", category: "Fiction" },
  { from: "CH(B/M)000001", to: "CH(B/M)000004", category: "Children" },
  { from: "PD(B/M)000001", to: "PD(B/M)000004", category: "Personal Development" },
];

const AdminPage = () => {
  const role=useSelector((state)=>state.auth.user.role)
  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-around mb-4">
      {role==='admin' &&  <Link to="/maintainance" className="text-blue-500 hover:underline">Maintenance</Link>}
       <Link to="/report" className="text-blue-500 hover:underline">Report</Link>
        <Link to="/transaction" className="text-blue-500 hover:underline">Transactions</Link>
      </nav>
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4  border">From</th>
              <th className="py-2 px-4 border">To</th>
              <th className="py-2 px-4 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{item.from}</td>
                <td className="py-2 px-4 border">{item.to}</td>
                <td className="py-2 px-4 border">{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
