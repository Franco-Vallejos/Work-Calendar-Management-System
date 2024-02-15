import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import {useAuth} from "../auth/AuthProvider.jsx"

function ProtectedRoute(){
    const auth = useAuth()
    const [isAuth, setIsAuth] = useState(false);

    return auth.isAuthenticated ? <Outlet/> : <Navigate to = '/login'/> 
}

export default ProtectedRoute;