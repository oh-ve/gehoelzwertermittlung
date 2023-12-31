import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
