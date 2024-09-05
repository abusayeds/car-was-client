// src/components/ErrorPage.jsx

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="text-lg mt-2">Sorry, the page you're looking for doesn't exist.</p>
      <div className="mt-6">
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-4">
          Home
        </Link>
        <Link to="/login" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
