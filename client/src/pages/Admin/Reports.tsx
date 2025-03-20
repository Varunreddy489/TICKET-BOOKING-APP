import ReportFilters from "@/components/Admin/Revenue/ReportFilters"
import { AdminDashboardLayout } from "@/layout/AdminDashboardLayout"
import { DashboardHeader } from "@/components/Admin/DashboardHeader"
import { RevenueReports } from "@/components/Admin/Revenue/RevenueReports"

const Reports = () => {
  return (
    <AdminDashboardLayout>
    <DashboardHeader heading="Revenue Reports" text="View and download revenue reports" />
    <ReportFilters />
    <RevenueReports />
  </AdminDashboardLayout>
  )
}

export default Reports