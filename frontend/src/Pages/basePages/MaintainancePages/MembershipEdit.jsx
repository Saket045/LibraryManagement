import { useState } from "react";

const MembershipEdit = () => {
  const [formData, setFormData] = useState({
    membershipNumber: "",
    startDate: "",
    endDate: "",
    membershipExtn: "6",
    removeMembership: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio" && name === "removeMembership") {
      setFormData({ ...formData, removeMembership: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "startDate" || name === "membershipExtn") {
      let startDate = name === "startDate" ? value : formData.startDate;
      let duration = name === "membershipExtn" ? value : formData.membershipExtn;

      if (startDate) {
        let endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + parseInt(duration));
        setFormData({ ...formData, [name]: value, endDate: endDate.toISOString().split("T")[0] });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Membership Data:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Update Membership</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Membership Number */}
        <div>
          <label className="block text-gray-700">Membership Number:</label>
          <input
            type="text"
            name="membershipNumber"
            value={formData.membershipNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* End Date (Auto-calculated) */}
        <div>
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            readOnly
            className="w-full p-2 border rounded mt-1 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Membership Extension */}
        <div>
          <label className="block text-gray-700">Membership Extension:</label>
          <div className="flex flex-col gap-2 mt-1">
            <label className="flex items-center">
              <input
                type="radio"
                name="membershipExtn"
                value="6"
                checked={formData.membershipExtn === "6"}
                onChange={handleChange}
                className="mr-2"
              />
              Six Months
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="membershipExtn"
                value="12"
                checked={formData.membershipExtn === "12"}
                onChange={handleChange}
                className="mr-2"
              />
              One Year
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="membershipExtn"
                value="24"
                checked={formData.membershipExtn === "24"}
                onChange={handleChange}
                className="mr-2"
              />
              Two Years
            </label>
          </div>
        </div>

        {/* Membership Remove */}
        <div>
          <label className="block text-gray-700">Remove Membership:</label>
          <label className="flex items-center mt-1">
            <input
              type="radio"
              name="removeMembership"
              value="true"
              checked={formData.removeMembership === true}
              onChange={handleChange}
              className="mr-2"
            />
            Yes, Remove Membership
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
        >
          Update Membership
        </button>
      </form>
    </div>
  );
};

export default MembershipEdit;
