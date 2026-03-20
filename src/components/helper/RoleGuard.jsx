import { Navigate, useLocation } from "react-router-dom"
import { getSecureUser } from "../lib/cookieAuth";

const access = {
    admin: ["/admin", "login", "user"],
    user: ["/user", "login"]
};

const hasPermission = (role, route) =>
    access[role]?.some(path => route.includes(path)) ?? false;


export function PathGuard({ children }) {
    const location = useLocation()
    const role = getSecureUser()?.role
    if (!hasPermission(role, location)){
        console.log('PathGuard');
        return <Navigate to="/403" replace />
    }
    return children
}