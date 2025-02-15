import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { setPage } from "../../../redux/slices/pageSlice";
import Availability from "./Availability";
import IssueBook from "./IssueBook";
import ReturnBook from "./ReturnBook";

const transactions = [
  { name: "Book Availibility" },
  { name: "Issue book" },
  { name: "Return book"},
];

const Transaction = () => {
   const dispatch=useDispatch();
   const page=useSelector((state)=>state.page.title);
  return (
    <div className="w-full flex">
<div className="w-1/4 p-4 h-screen">
      <h2 className="text-2xl font-bold mb-4">Available transactions</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {transactions.map((item, index) => (
          <li key={index} className="py-2 lg:py-6 border-b last:border-none">
            <button  onClick={()=>dispatch(setPage(item.name))} className="text-blue-500 hover:underline">
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
    <div className="w-3/4 h-screen">
           {page==="Book Availibility" && <Availability/>}
           {page==="Issue book" && <IssueBook/>}
           {page==="Return book" && <ReturnBook/>}
    </div>
    </div>
  );
};

export default Transaction;
