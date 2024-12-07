import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 font-semibold text-xl underline"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
