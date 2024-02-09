import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

function ProtectedRoute(){
    const [isAuth, setIsAuth] = useState(true);

    return isAuth ? <Outlet/> : <Navigate to = '/login'/> 
}

export default ProtectedRoute;