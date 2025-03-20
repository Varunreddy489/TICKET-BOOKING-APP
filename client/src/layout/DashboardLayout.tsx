import { ThemeProvider } from "@/components/ui/theme-provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="p-6">{children}</main>
    </ThemeProvider>
  );
};

export default DashboardLayout;
