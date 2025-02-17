import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Toaster />
      <Outlet />
    </>
  );
};

export default Layout;

//! backend json-server commond -
// npx json-server backend/db.json --watch --port 4040