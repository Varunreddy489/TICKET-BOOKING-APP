import { useEffect } from "react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Spinner from "@/components/ui/Spinner";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import TicketCard from "./TicketCard";

const TicketHistory = ({ limit }: { limit: number }) => {
  const storedUser = localStorage.getItem("userId");
  const userId = storedUser ? JSON.parse(storedUser) : null;

  const { tickets, getUserTickets, isLoading, error } = useUserStore();

  useEffect(() => {
    getUserTickets(userId);
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    <Spinner />;
  }

  // console.log(tickets);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Ticket Bookings</CardTitle>
            <CardDescription>
              View your past and upcoming movie tickets
            </CardDescription>
          </div>
          {tickets.length > 4 && (
            <Button variant="ghost" size="sm">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tickets.slice(0, limit).map((ticket: any) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          {/*   */}
          {/* <h1>Showing of 4 of {tickets.length} tickets</h1>
          <p>For More Visit Ticket History</p> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TicketHistory;

// new Date(ticket.createdAt).getTime() > new Date().getTime() - 24 * 60 * 60 * 1000

{
  /* {tickets.slice(0, limit).map((ticket: any) => (
          <div
            key={ticket.id}
            className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border"
          >
            <div className="flex-shrink-0">
              <img
                src={ticket.image || "/placeholder.svg"}
                alt={ticket.movie.name}
                className="rounded-md object-cover h-[120px] w-[90px]"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-semibold text-lg">{ticket.movie.name}</h3>
                <div className="flex gap-4">
                  <Badge variant={ticket.isExpired ? "default" : "secondary"}>
                    {ticket.isExpired === false ? "Upcoming" : "Expired"}
                  </Badge>
                  {ticket.isExpired}

                  <Button variant="ghost" size="sm">
                    <Ban />
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {ticket.theater === undefined ? "Theater" : ticket.theater}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ticket className="h-4 w-4" />
                  <span>
                    Seats:{" "}
                    {ticket.Seat.map((seat: any) => seat.seatNumber).join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span>Total: {ticket.totalCost} $ </span>
                </div>
              </div>
            </div>
          </div>
        ))} */
}
