import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import { DashboardShell } from "@/components/Admin/DashboardShell";
import { DashboardStats } from "@/components/Admin/DashboardStats";
import { OccupancyChart } from "@/components/Admin/OccupancyChart";
import { PopularMovies } from "@/components/Admin/PopularMovies";
import RecentReservations from "@/components/Admin/RecentReservations";
import { RevenueChart } from "@/components/Admin/RevenueChart";

const AdminDashBoard = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your movie booking system"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RevenueChart />
        </div>
        <div className="col-span-3">
          <OccupancyChart />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <RecentReservations />
        <PopularMovies />
      </div>
    </DashboardShell>
  );
};

export default AdminDashBoard;
