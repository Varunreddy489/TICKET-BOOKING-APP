import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import { AdminDashboardLayout } from "@/layout/AdminDashboardLayout";
import { ShowtimeFilters } from "@/components/Admin/Showtimes/ShowtimeFilters";
import { ShowtimesTable } from "@/components/Admin/Showtimes/ShowtimesTable";

export default function Showtimes() {
  return (
    <AdminDashboardLayout>
      <DashboardHeader
        heading="Showtimes"
        text="Manage movie showtimes and seating"
        action={{
          label: "Add Showtime",
          to: "/showtimes/new",
        }}
      />
      <ShowtimeFilters />
      <ShowtimesTable />
    </AdminDashboardLayout>
  );
}
