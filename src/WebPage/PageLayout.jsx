import Navbar from "./Navbar";
import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import Footer from "./Footer";
import Dashboard from "./Dashboard";


function PageLayout() {
    const location=useLocation();

    return <>
        <Navbar />
        <main>{location.pathname==="/"?<Dashboard/>:<Outlet/>}</main>
        <Footer/>

    </>

}

export default PageLayout;