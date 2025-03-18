import ReportFilters from "@/components/Admin/Revenue/ReportFilters"
import { DashboardShell } from "@/components/Admin/DashboardShell"
import { DashboardHeader } from "@/components/Admin/DashboardHeader"
import { RevenueReports } from "@/components/Admin/Revenue/RevenueReports"

const Reports = () => {
  return (
    <DashboardShell>
    <DashboardHeader heading="Revenue Reports" text="View and download revenue reports" />
    <ReportFilters />
    <RevenueReports />
  </DashboardShell>
  )
}

export default Reports