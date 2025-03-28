import { Search } from "../components/Admin/Search";
import { Sidebar } from "../components/Admin/Sidebar";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}


export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="font-bold text-xl flex items-center">
            <span className="hidden md:inline-block mr-2">🎬</span> Quick Tickets
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Search />
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1  space-x-2 space-y-6  p-6 md:p-8 pt-6">{children}</main>
      </div>
    </div>
  );
}
