import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");

    alert("Logged out");
  };

  return (
    <div className="bg-black text-white px-8 py-4 flex justify-between items-center flex-wrap">
      <h1 className="text-2xl font-bold">
        Crowd Predictor
      </h1>

      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          to="/register"
          className="hover:text-gray-300"
        >
          Register
        </Link>

        <Link
          to="/login"
          className="hover:text-gray-300"
        >
          Login
        </Link>

        <Link
          to="/report"
          className="hover:text-gray-300"
        >
          Report
        </Link>

        <button
          onClick={logout}
          className="
            bg-white
            text-black
            px-4
            py-2
            rounded-xl
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;