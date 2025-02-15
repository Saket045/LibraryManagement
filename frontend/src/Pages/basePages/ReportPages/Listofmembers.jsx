const members = [
  { id: "M001", name: "John Doe", contact: "1234567890", address: "123 Main St", aadhar: "1234-5678-9012", startDate: "2023-01-01", endDate: "2024-01-01", status: "Active" },
  { id: "M002", name: "Jane Smith", contact: "9876543210", address: "456 Oak St", aadhar: "2345-6789-0123", startDate: "2022-06-15", endDate: "2023-06-15", status: "Inactive" },
  { id: "M003", name: "Alice Johnson", contact: "5556667777", address: "789 Pine St", aadhar: "3456-7890-1234", startDate: "2021-09-10", endDate: "2022-09-10", status: "Inactive" }
];

const Listofmembers = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Membership List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Membership ID</th>
              <th className="py-2 px-4 border">Name of Member</th>
              <th className="py-2 px-4 border">Contact Number</th>
              <th className="py-2 px-4 border">Contact Address</th>
              <th className="py-2 px-4 border">Aadhar Card No</th>
              <th className="py-2 px-4 border">Start Date of Membership</th>
              <th className="py-2 px-4 border">End Date of Membership</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{member.id}</td>
                <td className="py-2 px-4 border">{member.name}</td>
                <td className="py-2 px-4 border">{member.contact}</td>
                <td className="py-2 px-4 border">{member.address}</td>
                <td className="py-2 px-4 border">{member.aadhar}</td>
                <td className="py-2 px-4 border">{member.startDate}</td>
                <td className="py-2 px-4 border">{member.endDate}</td>
                <td className="py-2 px-4 border">{member.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listofmembers;
