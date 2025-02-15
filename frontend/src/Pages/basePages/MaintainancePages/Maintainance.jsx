import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../redux/slices/pageSlice";
import Membership from "./Membership";
import BookAdd from "./BookAdd";
import MembershipEdit from "./MembershipEdit";
import BookEdit from "./BookEdit";

const Maintainance = () => {
    const dispatch=useDispatch();
    const title=useSelector((state)=>state.page.title)
  return (
    <div className="p-4 flex">
      <div className="mt-10 ml-4 lg:w-1/4 gap-4 mx-auto">
      <h1 className="text-black text-2xl font-bold ml-2 mb-4">Admin Panel</h1>
        {/* Membership Section */}
        <div className="bg-gray-100 p-4 flex rounded-lg shadow">
          <h2 className="text-lg font-bold mr-6 mb-2">Membership</h2>
          <div className="flex flex-col gap-2">
            <button onClick={()=>dispatch(setPage("Add Membership"))} className="w-20 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add
            </button>
            <button onClick={()=>dispatch(setPage("Update Membership"))} className="w-20 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
              Update
            </button>
          </div>
        </div>

        {/* Books Section */}
        <div className="bg-gray-100 p-4 flex rounded-lg shadow mt-4">
          <h2 className="text-lg font-bold mb-2 mr-20">Books</h2>
          <div className="flex flex-col gap-2">
            <button onClick={()=>dispatch(setPage("Add Books"))} className="w-20 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add
            </button>
            <button onClick={()=>dispatch(setPage("Update Books"))} className="w-20 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">
              Update
            </button>
          </div>
        </div>
      </div>

  <div className="w-3/4">
  {title==="Add Membership" && <Membership/>}
  {title==="Update Membership" && <MembershipEdit/>}
  {title==="Add Books" && <BookAdd/>}
  {title==="Update Books" && <BookEdit/>}
  </div>

    </div>
  );
};

export default Maintainance;
