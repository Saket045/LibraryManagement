import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { setPage } from "../../../redux/slices/pageSlice";
import Listofbooks from "./Listofbooks";
import Listofmembers from "./Listofmembers";
import ActiveIssues from "./ActiveIssues";
// import OverdueReturns from "./OverdueReturns";

const reports = [
  { name: "Master List of Books" },
  { name: "Master List of Memberships" },
  { name: "Active Issues"},
  // { name: "Overdue Returns" },
];

const ReportsPage = () => {
   const dispatch=useDispatch();
   const page=useSelector((state)=>state.page.title);
  return (
    <div className="w-full flex">
<div className="w-1/4 p-4 h-screen">
      <h2 className="text-2xl font-bold mb-4">Available Reports</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {reports.map((report, index) => (
          <li key={index} className="py-2 lg:py-6 border-b last:border-none">
            <button  onClick={()=>dispatch(setPage(report.name))} className="text-blue-500 hover:underline">
              {report.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
    <div className="w-3/4 h-screen">
           {page==="Master List of Books" && <Listofbooks/>}
           {page==="Master List of Memberships" && <Listofmembers/>}
           {page==="Active Issues" && <ActiveIssues/>}
           {/* {page==="Overdue Returns" && <OverdueReturns/>} */}
    </div>
    </div>
  );
};

export default ReportsPage;
