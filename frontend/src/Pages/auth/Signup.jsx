/* eslint-disable no-unused-vars */
// Import necessary modules
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, setLoading, setUser } from '../../redux/slices/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  // Initialize state for form inputs
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: ""  
  });

  // Handle form input changes
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    try {
      dispatch(setLoading(true));
      e.preventDefault();
      console.log("hi");
      // Make API call to signup
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      console.log(data);
      dispatch(setUser(data));
      dispatch(login());

      navigate("/");

      console.log(data);
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Library
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm mb-2 font-medium text-gray-600">Role</label>
            <input
              type="text"
              name="role"
              value={input.role}
              onChange={handleInput}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your role (e.g. user, admin)"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
