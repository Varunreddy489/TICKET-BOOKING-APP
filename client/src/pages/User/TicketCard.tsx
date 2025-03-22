import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Ticket } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTicketStore } from "@/store/useTicketStore";

import { Calendar, MapPin, Ticket as TicketIcon, Ban } from "lucide-react";

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const { refundTickets, isLoading, error } = useTicketStore();


  const ticketId = ticket.id;

  const storedUser = localStorage.getItem("userId");
  const userId = storedUser ? JSON.parse(storedUser) : null;
  const handleRefund = async () => {
    try {
      if (!userId || !ticketId) {
        console.error("User or ticket id is missing");
        return;
      }

      if (ticket.isExpired) {
        toast("Ticket has already expired!");
        console.log("Ticket has already expired!");
        return;
      }

      await refundTickets(userId, ticketId);
      toast("Ticket refunded successfully!");
      console.log("Ticket refunded successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    console.log(error);
  }

  return (
    <div
      key={ticket.id}
      className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border"
    >
      <div className="flex-shrink-0">
        <img
          src={ticket.movie?.image || "/placeholder.svg"}
          alt={ticket.movie?.name || "Movie"}
          className="rounded-md object-cover h-[120px] w-[90px]"
        />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-semibold text-lg">
            {ticket.movie?.name || "Unknown Movie"}{" "}
          </h3>
          <div className="flex gap-4">
            <Badge variant={ticket.isExpired ? "secondary" : "default"}>
              {ticket.isExpired ? "Expired" : "Upcoming"}
            </Badge>
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={isLoading} variant="ghost" size="sm">
                  <Ban className="h-4 w-4" />
                  Cancel
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className=" items-center gap-4">
                  The Ticket will be refunded to your wallet
                </div>
                <DialogFooter>
                  <Button
                    disabled={isLoading}
                    onClick={handleRefund}
                    type="submit"
                  >
                    Cancel Ticket
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {ticket.createdAt
                ? new Date(ticket.createdAt).toLocaleString()
                : "Unknown date"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{ticket.theater || "Theater"}</span>{" "}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TicketIcon className="h-4 w-4" />
            <span>
              Seats:{" "}
              {ticket.Seat?.map((seat) => seat.seatNumber).join(", ") || "N/A"}
            </span>{" "}
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>Total: ${ticket.totalCost?.toFixed(2) || "0.00"}</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
