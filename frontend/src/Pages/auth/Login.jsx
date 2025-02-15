/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, setUser } from '../../redux/slices/userSlice.js';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await fetch('/api/auth/login', {
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
      dispatch(setUser(data));
      dispatch(login());
      navigate("/");
      console.log(data);
    } catch (err) {
      console.error('Error logging in:', err);
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-3">Email</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-3">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
       
        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
