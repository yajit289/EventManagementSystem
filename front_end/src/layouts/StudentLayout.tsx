import { Navigate, Outlet } from "react-router-dom"

export default function StudentLayout() {
  const role = localStorage.getItem("role")

  if (role !== "student") {
    return <Navigate to="/dashboard" />
  }

  return <Outlet />
}