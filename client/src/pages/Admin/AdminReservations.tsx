import { DashboardShell } from "@/components/Admin/DashboardShell";
import ReservationsTable from "@/components/Admin/Reservations/ReservationsTable";
import { DashboardHeader } from "@/components/Admin/DashboardHeader";
import ReservationFilters from "@/components/Admin/Reservations/ReservationFilters";

const AdminReservations = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reservations"
        text="Manage ticket reservations"
      />
      <ReservationFilters />
      <ReservationsTable />
    </DashboardShell>
  );
};

export default AdminReservations;
