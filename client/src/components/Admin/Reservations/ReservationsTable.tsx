import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, Trash, Eye, Mail } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useState } from "react";

const reservations = [
  {
    id: "1",
    customer: "John Doe",
    email: "john.doe@example.com",
    movie: "Dune: Part Two",
    screen: "IMAX Screen 1",
    date: "2025-03-15",
    time: "18:30",
    seats: "A12, A13, A14",
    totalAmount: "$72.00",
    status: "Active",
  },
  {
    id: "2",
    customer: "Alice Smith",
    email: "alice.smith@example.com",
    movie: "Deadpool & Wolverine",
    screen: "Screen 2",
    date: "2025-03-15",
    time: "19:00",
    seats: "C5, C6",
    totalAmount: "$36.00",
    status: "Active",
  },
  {
    id: "3",
    customer: "Robert Johnson",
    email: "robert.johnson@example.com",
    movie: "Furiosa: A Mad Max Saga",
    screen: "Screen 6",
    date: "2025-03-15",
    time: "20:45",
    seats: "F8, F9, F10, F11",
    totalAmount: "$72.00",
    status: "Active",
  },
  {
    id: "4",
    customer: "Emma Brown",
    email: "emma.brown@example.com",
    movie: "Inside Out 2",
    screen: "Screen 5",
    date: "2025-03-15",
    time: "16:00",
    seats: "D15, D16",
    totalAmount: "$32.00",
    status: "Active",
  },
  {
    id: "5",
    customer: "Michael Davis",
    email: "michael.davis@example.com",
    movie: "The Fall Guy",
    screen: "Screen 7",
    date: "2025-03-15",
    time: "17:15",
    seats: "B7, B8",
    totalAmount: "$32.00",
    status: "Active",
  },
  {
    id: "6",
    customer: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    movie: "Dune: Part Two",
    screen: "Screen 3",
    date: "2025-03-15",
    time: "20:15",
    seats: "E10, E11, E12",
    totalAmount: "$54.00",
    status: "Pending",
  },
  {
    id: "7",
    customer: "David Miller",
    email: "david.miller@example.com",
    movie: "Deadpool & Wolverine",
    screen: "Screen 4",
    date: "2025-03-15",
    time: "21:30",
    seats: "G3, G4",
    totalAmount: "$36.00",
    status: "Expired",
  },
];

const ReservationsTable = () => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reservationList, setReservationList] = useState(reservations);
  const [reservationToCancel, setReservationToCancel] = useState<string | null>(
    null
  );

  const handleCancelReservation = () => {
    if (reservationToCancel) {
      setReservationList(
        reservationList.map((reservation) =>
          reservation.id === reservationToCancel
            ? { ...reservation, status: "Expired" }
            : reservation
        )
      );
      setReservationToCancel(null);
      setCancelDialogOpen(false);
    }
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Movie</TableHead>
            <TableHead>Showtime</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservationList.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                <div className="font-medium">{reservation.customer}</div>
                <div className="text-sm text-muted-foreground">
                  {reservation.email}
                </div>
              </TableCell>
              <TableCell>{reservation.movie}</TableCell>
              <TableCell>
                <div>{format(new Date(reservation.date), "MMM d, yyyy")}</div>
                <div className="text-sm text-muted-foreground">
                  {reservation.time}
                </div>
                <div className="text-sm text-muted-foreground">
                  {reservation.screen}
                </div>
              </TableCell>
              <TableCell>{reservation.seats}</TableCell>
              <TableCell>{reservation.totalAmount}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    reservation.status === "Active"
                      ? "default"
                      : reservation.status === "Pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {reservation.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to={`/reservations/${reservation.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Confirmation
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {reservation.status === "Active" && (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setReservationToCancel(reservation.id);
                          setCancelDialogOpen(true);
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Cancel Reservation
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to cancel this reservation?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. The seats will be made available for
              other customers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
            >
              Go Back
            </Button>
            <Button variant="destructive" onClick={handleCancelReservation}>
              Cancel Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ReservationsTable;
