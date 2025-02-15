import { useState } from "react";

const Membership = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    startDate: "",
    endDate: "",
    membership: "6",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Automatically calculate end date based on membership selection
    if (name === "startDate" || name === "membership") {
      let startDate = name === "startDate" ? value : formData.startDate;
      let duration = name === "membership" ? value : formData.membership;

      if (startDate) {
        let endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + parseInt(duration));
        setFormData({ ...formData, [name]: value, endDate: endDate.toISOString().split("T")[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Membership Data Submitted:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Membership Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* Name */}
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-gray-700">Contact Number:</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
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

        {/* Membership Duration */}
        <div>
          <label className="block text-gray-700">Membership Duration:</label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center">
              <input
                type="radio"
                name="membership"
                value="6"
                checked={formData.membership === "6"}
                onChange={handleChange}
                className="mr-2"
              />
              6 Months
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="membership"
                value="12"
                checked={formData.membership === "12"}
                onChange={handleChange}
                className="mr-2"
              />
              12 Months
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Membership;
