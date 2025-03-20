import { Calendar, MapPin, Ticket } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tickets = [
  {
    id: 1,
    movieName: "Dune: Part Two",
    timing: "March 15, 2025 - 7:30 PM",
    seats: "G12, G13",
    totalCost: "$32.00",
    status: "upcoming",
    theater: "AMC Lincoln Square",
    image: "/placeholder.svg?height=120&width=90",
  },
  {
    id: 2,
    movieName: "Deadpool & Wolverine",
    timing: "March 10, 2025 - 9:00 PM",
    seats: "F5, F6, F7",
    totalCost: "$48.00",
    status: "upcoming",
    theater: "Regal Cinemas",
    image: "/placeholder.svg?height=120&width=90",
  },
  {
    id: 3,
    movieName: "Oppenheimer",
    timing: "February 28, 2025 - 6:15 PM",
    seats: "D10",
    totalCost: "$16.00",
    status: "expired",
    theater: "Cinemark",
    image: "/placeholder.svg?height=120&width=90",
  },
  {
    id: 4,
    movieName: "Barbie",
    timing: "February 20, 2025 - 5:45 PM",
    seats: "H8, H9",
    totalCost: "$32.00",
    status: "expired",
    theater: "AMC Empire 25",
    image: "/placeholder.svg?height=120&width=90",
  },
];

interface TicketHistoryProps {
  limit?: number
}
const TicketHistory = ({ limit }: TicketHistoryProps) => {
  const displayedTickets = limit ? tickets.slice(0, limit) : tickets;
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
          {limit && tickets.length > limit && (
            <Button variant="ghost" size="sm">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayedTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border"
          >
            <div className="flex-shrink-0">
              <img
                src={ticket.image || "/placeholder.svg"}
                alt={ticket.movieName}
                className="rounded-md object-cover h-[120px] w-[90px]"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-semibold text-lg">{ticket.movieName}</h3>
                <Badge
                  variant={
                    ticket.status === "upcoming" ? "default" : "secondary"
                  }
                >
                  {ticket.status === "upcoming" ? "Upcoming" : "Expired"}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{ticket.timing}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{ticket.theater}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ticket className="h-4 w-4" />
                  <span>Seats: {ticket.seats}</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span>Total: {ticket.totalCost}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      {!limit && (
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Showing {displayedTickets.length} of {tickets.length} tickets
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default TicketHistory;
