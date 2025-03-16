import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import { DashboardShell } from "@/components/Admin/DashboardShell";
import MovieFilters from "@/components/Admin/MovieFilters";
import { MoviesTable } from "@/components/Admin/MoviesTable";

export default function MoviesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Movies"
        text="Manage your movie catalog"
        action={{
          label: "Add Movie",
          to: "/movies/new",
        }}
      />
      <MovieFilters />
      <MoviesTable />
    </DashboardShell>
  );
}
