import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";

const AdminPrivate = ({ children }) => {
  const adminID = sessionStorage.getItem("adminID");

  return <div>{adminID ? <>{children}</> : <Navigate to="/" />}</div>;
};

export default AdminPrivate;
