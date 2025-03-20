import { useState } from "react";
import { Link } from "react-router-dom";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { Ticket, LayoutDashboard, Menu, X, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SignInOAuthButtons from "./SignInOAuthButtons";

export default function TopBar() {
  const storedUser = localStorage.getItem("userData");
  const userId = storedUser ? JSON.parse(storedUser) : null;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "  transition-all duration-300 ease-in-out",
        "backdrop-blur-md bg-black/70 border-b py-4 border-white/10"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo & Title */}
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-lg transition-transform group-hover:scale-110 duration-300">
              <Ticket className="h-5 w-5 text-black" />
            </div>
            <div className="font-bold text-xl md:text-2xl">
              <span className="text-white">Quick</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Tickets
              </span>
            </div>
          </Link>

          <div className="relative w-full max-w-md">
            <input
              type="search"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              placeholder="Search for movies"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Center Section - Navigation (Desktop) */}
          {/* <nav className="flex items-center gap-6">
           
            
          </nav> */}

          <div className="flex items-center align-middle   gap-4">
            <div>
              <Link to="/admin">
                <Button
                  variant="outline"
                  className="border-yellow-500/50 bg-transparent text-white hover:bg-yellow-500/10 hover:text-yellow-400 transition-all duration-300"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </Button>
              </Link>
            </div>
            <div>
              <SignedOut>
                <SignInOAuthButtons />
              </SignedOut>
              <UserButton />
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        to={`/profile/${userId}`}
                        className="relative px-4 py-2 text-white font-medium transition-all duration-300 hover:text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/wallet"
                        className="relative px-4 py-2 text-white font-medium transition-all duration-300 hover:text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
                      >
                        Wallet
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/tickets"
                        className="relative px-4 py-2 text-white font-medium transition-all duration-300 hover:text-yellow-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-yellow-400 after:transition-all hover:after:w-full"
                      >
                        Booked Tickets
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-md bg-black/20 text-white hover:bg-black/40 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0"
          )}
        >
          <nav className="flex flex-col gap-4">
            <Link
              to="/tickets"
              className="px-4 py-2 text-white font-medium hover:bg-white/5 rounded-md transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Booked Tickets
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2 text-white font-medium hover:bg-white/5 rounded-md transition-all flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
