import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { StudentSidebar } from "@/components/student-sidebar"

export default function EstudianteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
                <StudentSidebar />
                <main className="flex-1 overflow-hidden">{children}</main>
            </div>
        </SidebarProvider>
    )
}
