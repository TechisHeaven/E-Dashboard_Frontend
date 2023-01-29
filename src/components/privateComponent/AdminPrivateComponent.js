import React  from "react";
import { Outlet, Navigate } from "react-router-dom";


const AdminPrivateComponent = ()=>{
    const auth = JSON.parse(localStorage.getItem('users'))
    return auth.role === "ADMIN" ?<Outlet/>:<Navigate to="/"/>
}

export default AdminPrivateComponent