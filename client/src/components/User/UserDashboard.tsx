import { useState } from "react";
import { CalendarDays, CreditCard, Star, Ticket, User } from "lucide-react";

import Wallet from "@/pages/User/UserWallet";
import Profile from "@/pages/User/UserProfile";
import UserReviews from "@/pages/User/UserReviews";
import TicketHistory from "@/pages/User/TicketHistory";
import MovieRecommendations from "@/pages/User/MovieRecomendations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/clerk-react";

const UserDashboard = () => {
  const {user}=useUser()
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex justify-between px-10"  >
        <h1 className="text-3xl font-bold tracking-tight">UserDashboard</h1>
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary/10">
            <User className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
          </div>
           <span className="font-medium">{user?.firstName} {user?.lastName}</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className={`w-full`}>
        {/* // * Overview */}
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger
            value="overview"
            className={`flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-black text-white"
                : "bg-transparent"
            }`}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          {/* // * Tickets */}
          <TabsTrigger
            value="tickets"
            className={`flex items-center gap-2  ${activeTab} ? "bg-red-900" :"bg-white"`}
          >
            <Ticket className="h-4 w-4" />
            <span className="hidden sm:inline">Tickets</span>
          </TabsTrigger>
          {/* // * Wallet */}
          <TabsTrigger
            value="wallet"
            className={`flex items-center gap-2  ${activeTab} ? "bg-black" :""`}
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Wallet</span>
          </TabsTrigger>
          {/* // * Reviews */}
          <TabsTrigger
            value="reviews"
            className={`flex items-center gap-2  ${activeTab} ? "bg-black" :""`}
          >
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">Reviews</span>
          </TabsTrigger>
          {/* // * Upcoming */}
          <TabsTrigger
            value="upcoming"
            className={`flex items-center gap-2  ${activeTab} ? "bg-black" :""`}
          >
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">Upcoming</span>
          </TabsTrigger>
        </TabsList>

        {/*  //* TabsContent */}
        <TabsContent value="overview" className="space-y-6 pt-4">
          <Profile />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TicketHistory limit={4} />
            <Wallet limit={10} />
          </div>
          <MovieRecommendations />
        </TabsContent>
        <TabsContent value="tickets" className="pt-4">
          <TicketHistory limit={99} />
        </TabsContent>
        <TabsContent value="wallet" className="pt-4">
          <Wallet fullWidth limit={999} />
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <UserReviews />
        </TabsContent>
        <TabsContent value="upcoming" className="pt-4">
          <MovieRecommendations fullWidth />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
