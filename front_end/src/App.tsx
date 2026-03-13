import SignupPage from "./pages/Auth/SignupPage"
import LoginPage from "./pages/Auth/LoginPage"
import DashboardLayout from "./layouts/DashboardLayot"
import StudentLayout from "./layouts/StudentLayout"
import AdminLayout from "./layouts/AdminLayout"
import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/StudentPage/Dashboard"
import Events from "./pages/StudentPage/Events"
import Winners from "./pages/StudentPage/Winners"
import Profile from "./pages/StudentPage/Profile"
import AdminDashboard from "./pages/AdminPage/AdminDashbord"
import AdminWinners from "./pages/AdminPage/AdminWinners"
import CreateEvent from "./pages/AdminPage/CreateEvent"

export function App() {
  return (

    <Routes>
      <Route path="/register" element={<SignupPage></SignupPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      {/* Admin Protected Routes */}
      <Route element={<AdminLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>} />
          <Route path="/admin/events" element={<Events></Events>} />
          <Route path="/admin/winners" element={<AdminWinners></AdminWinners>} />
          <Route path="/admin/createevent" element={<CreateEvent></CreateEvent>}></Route>
        </Route>
      </Route>

      <Route element={<StudentLayout />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student/dashboard" element={<Dashboard />} />
          <Route path="/student/events" element={<Events />} />
          <Route path="/student/winners" element={<Winners />} />
          <Route path="/student/profile" element={<Profile />} />
        </Route>
      </Route>


    </Routes>
  )
}

export default App
