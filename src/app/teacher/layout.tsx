import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/teacher-sidebar"

export default function ProfesorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-hidden">{children}</main>
            </div>
        </SidebarProvider>
    )
}
