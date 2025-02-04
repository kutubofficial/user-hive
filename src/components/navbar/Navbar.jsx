import React from "react";
import style from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigate = useNavigate();
  const userID = sessionStorage.getItem("userID");
  const adminID = sessionStorage.getItem("adminID");
  const logout = () => {
    if (adminID) {
      sessionStorage.removeItem("adminID");
      toast.success("logged out");
      navigate("/");
    } else {
      sessionStorage.removeItem("userID");
      toast.success("logged out");
      navigate("/");
    }
  };
  return (
    <nav id={style.nav}>
      <figure>
        <img src="/hive.png" alt="hive-logo" title="hive" />
      </figure>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {adminID || userID ? (
          <>
            <li onClick={logout} className="primary-btn">
              Logout
            </li>
          </>
        ) : (
          <>
            <li className="primary-btn">
              <Link to="/login">login</Link>
            </li>
            <li className="secondary-btn">
              <Link to="/signup">signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
