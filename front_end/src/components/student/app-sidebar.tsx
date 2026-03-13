import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

import { LayoutDashboard, Calendar, Trophy, User,CirclePlus } from "lucide-react"
import { Link } from "react-router-dom"

const studentMenu = [
  { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
  { title: "Events", url: "/student/events", icon: Calendar },
  { title: "Winners", url: "/student/winners", icon: Trophy },
  { title: "Profile", url: "/student/profile", icon: User },
]
const adminMenu = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Create", url: "/admin/createevent", icon: CirclePlus },
  { title: "Events", url: "/admin/events", icon: Calendar },
  { title: "Winners", url: "/admin/winners", icon: Trophy },
]

export default function AppSidebar() {

  const role = localStorage.getItem("role")
  const menuItems = role === "admin" ? adminMenu : studentMenu
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h2 className="text-lg text-primary-foreground font-bold px-10 py-2">Campus Connect</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item, index) => {
            const Icon = item.icon

            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link to={item.url} className=" pl-20 flex items-center gap-2 rounded-md
                  hover:bg-accent hover:text-accent-foreground">
                    <Icon size={34} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
