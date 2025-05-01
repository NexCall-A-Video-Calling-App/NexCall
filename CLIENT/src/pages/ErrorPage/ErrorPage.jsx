import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold animated-gradient-text">404 - Page Not Found</h1>
      <p className="text-gray-300 mt-2 ">This page does not exist.</p>
      <div className="mt-4 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] text-white rounded"
        >
          Go Back
        </button>
        <Link to="/" className="px-4 py-2 border-2 border-purple-600 text-white rounded">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
