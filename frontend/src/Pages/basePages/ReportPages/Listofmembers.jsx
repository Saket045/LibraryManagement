import { useState, useEffect } from "react";

const Listofmembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/memberships", {
          method: "GET",
          credentials: "include", 
        });

        if (!response.ok) throw new Error("Failed to fetch members");

        const data = await response.json();
        setMembers(data); 
      } catch (error) {
        console.error("Error fetching memberships:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Membership List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Membership ID</th>
              <th className="py-2 px-4 border">User ID</th>
              <th className="py-2 px-4 border">Contact Number</th>
              <th className="py-2 px-4 border">Start Date</th>
              <th className="py-2 px-4 border">Expiry Date</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{member._id}</td>
                  <td className="py-2 px-4 border">{member.userId}</td>
                  <td className="py-2 px-4 border">{member.contactNumber}</td>
                  <td className="py-2 px-4 border">
                    {new Date(member.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(member.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">{member.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No memberships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listofmembers;
