import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./footer";

const Layout = () => {
  return (
    <>
      <Outlet />
      
    </>
    )
};
export default Layout;