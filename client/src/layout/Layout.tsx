import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div
      className="min-h-screen flex bg-gradient-to-b from-zinc-900 via-zinc-900
    to-black text-zinc-100  "
    >
      <main className="flex-grow  ">
        <TopBar />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
