import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import { AdminDashboardLayout } from "@/layout/AdminDashboardLayout";
import MovieFilters from "@/components/Admin/Movies/MovieFilters";
import { MoviesTable } from "@/components/Admin/Movies/MoviesTable";

export default function MoviesPage() {
  return (
    <AdminDashboardLayout>
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
    </AdminDashboardLayout>
  );
}
