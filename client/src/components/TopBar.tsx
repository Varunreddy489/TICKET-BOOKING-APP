import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { LayoutDashboardIcon } from "lucide-react";

const TopBar = () => {
  return (
    <div className="flex items-center w-full justify-between px-6 py-4 sticky top-0 bg-gray-700 bg-opacity-90 backdrop-blur-md z-20 shadow-md">
      {/* Logo & Title */}
      <div className="flex gap-3 items-center">
        <img
          src="/ticket.jpg"
          className="size-10 rounded-full"
          alt="QuickTickets logo"
        />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent tracking-wide">
          Quick<span className="text-yellow-300">Tickets</span>
        </h2>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link to={"/"} className={cn(buttonVariants({ variant: "link" }))}>
          Booked Tickets
        </Link>
        <Link
          to={"/admin"}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <LayoutDashboardIcon className="size-5 mr-2" />
          Admin Dashboard
        </Link>
      </div>

      {/* Authentication Section */}
      <div className="flex items-center text-black  gap-4">
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
