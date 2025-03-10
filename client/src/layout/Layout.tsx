import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";

const Layout = () => {
  return (
    <div className="min-h-screen flex bg-[#1F1B2B] ">
      <main className="flex-grow">
        <TopBar />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

// const [isMobile, setIsMobile] = useState(false);

// useEffect(() => {
//   const checkMobile = () => {
//     setIsMobile(window.innerWidth < 768);
//   };

//   checkMobile();
//   window.addEventListener("resize", checkMobile);
//   return () => window.removeEventListener("resize", checkMobile);
// }, []);
