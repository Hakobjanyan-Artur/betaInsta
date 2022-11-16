import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Componenrts/Navbar/Navbar";

function HomeWrapper() {
    
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default HomeWrapper