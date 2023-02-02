
import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./admin/AdminNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerficationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";


const Navbar = () => {
  //-----get user from store--------
  const state = useSelector((state) => state.users);
  const { adminAuth,userAuth, profile } = state;
  const isAdmin = adminAuth?.isAdmin;

  //account verification
  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {isAdmin ? (
      <>
        <AdminNavbar isLogin={adminAuth} />
      {/* <AdminSidebar/> */}
       </> 
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {/* display alert */}
      {userAuth?.isVerified || !userAuth ? null : (
        <AccountVerificationAlertWarning />
      )}
      {/* display success msg */}
      {loading && <h2 className="text-center">Loading please wait</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;

