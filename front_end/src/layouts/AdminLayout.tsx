import { Navigate, Outlet } from "react-router-dom"

export default function  AdminLayout(){
const role = localStorage.getItem("role")

  if (role !== "admin") {
    return <Navigate to="/dashboard" />
  }

  return <Outlet />
}