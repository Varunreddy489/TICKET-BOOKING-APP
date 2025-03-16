import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import { DashboardShell } from "@/components/Admin/DashboardShell";
import { ShowtimeFilters } from "@/components/Admin/ShowtimeFilters";
import { ShowtimesTable } from "@/components/Admin/ShowtimesTable";

export default function Showtimes() {
  return (
    <DashboardShell>
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
    </DashboardShell>
  )
}

