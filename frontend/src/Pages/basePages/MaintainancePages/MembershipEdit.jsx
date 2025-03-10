import { useState } from "react";

const MembershipEdit = () => {
  const [userId, setUserId] = useState("");
  const [membership, setMembership] = useState(null);
  const [duration, setDuration] = useState("");

  const fetchMembership = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/memberships/${userId}`);
      if (!response.ok) throw new Error("Membership not found");

      const data = await response.json();
      setMembership(data);
    } catch (error) {
      console.error("Error fetching membership:", error);
      alert("Membership not found!");
      setMembership(null);
    }
  };

  const updateMembership = async () => {
    if (!duration) {
      alert("Please enter a valid duration.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/memberships/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ duration }),
      });

      if (!response.ok) throw new Error("Failed to update membership");

      const data = await response.json();
      alert("Membership updated successfully!");
      setMembership(data.membership); 
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Membership</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Enter User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </div>

      <button
        onClick={fetchMembership}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
      >
        Fetch Membership
      </button>

      {membership && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-bold">Membership Details</h3>
          <p><strong>Contact:</strong> {membership.contactNumber}</p>
          <p><strong>Start Date:</strong> {new Date(membership.startDate).toLocaleDateString()}</p>
          <p><strong>Expiry Date:</strong> {new Date(membership.expiryDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {membership.status}</p>

          {/* Duration Input */}
          <div className="mt-4">
            <label className="block text-gray-700">Extend Duration (months):</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              min="1"
              required
            />
          </div>

          <button
            onClick={updateMembership}
            className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 transition-all"
          >
            Update Membership
          </button>
        </div>
      )}
    </div>
  );
};

export default MembershipEdit;
