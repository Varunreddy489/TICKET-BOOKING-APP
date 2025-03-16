
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MoreHorizontal, Pencil, Trash, Ticket } from "lucide-react"
import { format } from "date-fns"
import { Link } from "react-router-dom"

// Sample data - in a real app, this would come from an API
const showtimes = [
  {
    id: "1",
    movie: "Dune: Part Two",
    screen: "IMAX Screen 1",
    date: "2025-03-15",
    time: "18:30",
    totalSeats: 240,
    availableSeats: 87,
    price: "$24.00",
    status: "On Sale",
  },
  {
    id: "2",
    movie: "Dune: Part Two",
    screen: "Screen 3",
    date: "2025-03-15",
    time: "20:15",
    totalSeats: 180,
    availableSeats: 65,
    price: "$18.00",
    status: "On Sale",
  },
  {
    id: "3",
    movie: "Deadpool & Wolverine",
    screen: "Screen 2",
    date: "2025-03-15",
    time: "19:00",
    totalSeats: 180,
    availableSeats: 42,
    price: "$18.00",
    status: "On Sale",
  },
  {
    id: "4",
    movie: "Deadpool & Wolverine",
    screen: "Screen 4",
    date: "2025-03-15",
    time: "21:30",
    totalSeats: 120,
    availableSeats: 78,
    price: "$18.00",
    status: "On Sale",
  },
  {
    id: "5",
    movie: "Inside Out 2",
    screen: "Screen 5",
    date: "2025-03-15",
    time: "16:00",
    totalSeats: 150,
    availableSeats: 32,
    price: "$16.00",
    status: "On Sale",
  },
  {
    id: "6",
    movie: "Furiosa: A Mad Max Saga",
    screen: "Screen 6",
    date: "2025-03-15",
    time: "20:45",
    totalSeats: 150,
    availableSeats: 98,
    price: "$18.00",
    status: "On Sale",
  },
  {
    id: "7",
    movie: "The Fall Guy",
    screen: "Screen 7",
    date: "2025-03-15",
    time: "17:15",
    totalSeats: 120,
    availableSeats: 45,
    price: "$16.00",
    status: "On Sale",
  },
  {
    id: "8",
    movie: "Alien: Romulus",
    screen: "Screen 2",
    date: "2025-04-10",
    time: "19:30",
    totalSeats: 180,
    availableSeats: 180,
    price: "$20.00",
    status: "Coming Soon",
  },
]

export function ShowtimesTable() {
  const [showtimeList, setShowtimeList] = useState(showtimes)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [showtimeToDelete, setShowtimeToDelete] = useState<string | null>(null)

  const handleDeleteShowtime = () => {
    if (showtimeToDelete) {
      setShowtimeList(showtimeList.filter((showtime) => showtime.id !== showtimeToDelete))
      setShowtimeToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Movie</TableHead>
            <TableHead>Screen</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Seat Availability</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showtimeList.map((showtime) => (
            <TableRow key={showtime.id}>
              <TableCell className="font-medium">{showtime.movie}</TableCell>
              <TableCell>{showtime.screen}</TableCell>
              <TableCell>
                <div>{format(new Date(showtime.date), "MMM d, yyyy")}</div>
                <div className="text-sm text-muted-foreground">{showtime.time}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{showtime.availableSeats} available</span>
                      <span>{showtime.totalSeats} total</span>
                    </div>
                    <Progress value={(showtime.availableSeats / showtime.totalSeats) * 100} className="h-2" />
                  </div>
                </div>
              </TableCell>
              <TableCell>{showtime.price}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    showtime.status === "On Sale"
                      ? "default"
                      : showtime.status === "Coming Soon"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {showtime.status}
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
                      <Link to={`/showtimes/${showtime.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Showtime
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/reservations?showtime=${showtime.id}`}>
                        <Ticket className="mr-2 h-4 w-4" />
                        View Reservations
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setShowtimeToDelete(showtime.id)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Showtime
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this showtime?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the showtime and all associated reservations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteShowtime}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

