import { AdminDashboardLayout } from "@/layout/AdminDashboardLayout";
import ReservationsTable from "@/components/Admin/Reservations/ReservationsTable";
import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import ReservationFilters from "@/components/Admin/Reservations/ReservationFilters";

const AdminReservations = () => {
  return (
    <AdminDashboardLayout>
      <DashboardHeader
        heading="Reservations"
        text="Manage ticket reservations"
      />
      <ReservationFilters />
      <ReservationsTable />
    </AdminDashboardLayout>
  );
};

export default AdminReservations;
