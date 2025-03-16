import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Film, Clock, Ticket, BarChart } from "lucide-react";

export function Sidebar() {
  const location = useLocation(); // Get the current path
  const { pathname } = location;

  const routes = [
    {
      to: "/admin/",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/",
    },
    {
      to: "/admin/movies",
      label: "Movies",
      icon: Film,
      active: pathname.startsWith("/movies"),
    },
    {
      to: "/admin/showtimes",
      label: "Showtimes",
      icon: Clock,
      active: pathname.startsWith("/showtimes"),
    },
    {
      to: "/admin/reservations",
      label: "Reservations",
      icon: Ticket,
      active: pathname.startsWith("/reservations"),
    },
    {
      to: "/admin/reports",
      label: "Reports",
      icon: BarChart,
      active: pathname.startsWith("/reports"),
    },
    // {
    //   to: "/admin/users",
    //   label: "Users",
    //   icon: Users,
    //   active: pathname.startsWith("/users"),
    // },
    // {
    //   to: "/admin/settings",
    //   label: "Settings",
    //   icon: Settings,
    //   active: pathname.startsWith("/settings"),
    // },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.to}
                to={route.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-lg transition-all hover:text-primary",
                  route.active
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
              >
                <route.icon className="h-6 w-6" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
