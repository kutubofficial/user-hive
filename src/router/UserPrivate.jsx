import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const UserPrivate = ({children}) => {
  const userID = sessionStorage.getItem("userID");

  return <>{userID ? <>{children}</> : <Navigate to="/" />}</>;
};

export default UserPrivate;
