import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import { AdminDashboardLayout } from "@/layout/AdminDashboardLayout";
import { DashboardStats } from "@/components/Admin/Dashboard/DashboardStats";
import { OccupancyChart } from "@/components/Admin/Dashboard/OccupancyChart";
import { PopularMovies } from "@/components/Admin/Dashboard/PopularMovies";
import RecentReservations from "@/components/Admin/Dashboard/RecentReservations";
import { RevenueChart } from "@/components/Admin/Dashboard/RevenueChart";

const AdminDashBoard = () => {
  return (
    <AdminDashboardLayout>
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
    </AdminDashboardLayout>
  );
};

export default AdminDashBoard;
