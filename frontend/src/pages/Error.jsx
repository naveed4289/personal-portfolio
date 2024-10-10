import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-6xl font-bold text-red-600 mb-4">404</h2>
        <h4 className="text-xl font-semibold mb-4">Sorry! Page not found</h4>
        <p className="text-gray-700 mb-6">
          Oops! It seems like the page you're trying to access doesn't exist.
          If you believe there's an issue, feel free to report it, and we'll
          look into it.
        </p>
        <div className="flex justify-center gap-4">
          <NavLink
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Return Home
          </NavLink>
          <NavLink
            to="/contact"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Report Problem
          </NavLink>
        </div>
      </div>
    </section>
  );
};
