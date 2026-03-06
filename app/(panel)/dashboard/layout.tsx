import { SideBarDashboard } from "../_components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-nevoa min-h-screen">
            <SideBarDashboard>
                {children}
            </SideBarDashboard>
        </div>
    )
}