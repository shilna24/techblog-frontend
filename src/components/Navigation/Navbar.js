import React from "react";
import { useSelector } from "react-redux";

import AdminNavbar from "./admin/AdminNavbar";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";

const Navbar = () => {
  //ge user from store
  const state = useSelector(state => state.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  console.log(isAdmin);
  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth}/>
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
    </>
  );
};

export default Navbar;
