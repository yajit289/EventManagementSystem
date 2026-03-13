import AppSidebar from "@/components/student/app-sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <div className="flex w-full">
                <AppSidebar></AppSidebar>
                <main className="flex-1 p-6">
                    <Outlet></Outlet>
                </main>
            </div>
        </SidebarProvider>
    )
}