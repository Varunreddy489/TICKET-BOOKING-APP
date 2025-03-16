import { useState } from "react";
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
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react";
import { Switch } from "../ui/switch";
import { Link } from "react-router-dom";

// Sample data - in a real app, this would come from an API
const movies = [
  {
    id: "1",
    title: "Dune: Part Two",
    genres: ["Sci-Fi", "Adventure"],
    languages: ["English", "Spanish"],
    rating: "PG-13",
    cost: "$15.00",
    showtimes: 8,
    isActive: true,
    poster: "/placeholder.svg?height=96&width=64",
  },
  {
    id: "2",
    title: "Deadpool & Wolverine",
    genres: ["Action", "Comedy"],
    languages: ["English"],
    rating: "R",
    cost: "$14.00",
    showtimes: 12,
    isActive: true,
    poster: "/placeholder.svg?height=96&width=64",
  },
  {
    id: "3",
    title: "Furiosa: A Mad Max Saga",
    genres: ["Action", "Adventure"],
    languages: ["English"],
    rating: "R",
    cost: "$14.00",
    showtimes: 6,
    isActive: true,
    poster: "/placeholder.svg?height=96&width=64",
  },
  {
    id: "4",
    title: "Inside Out 2",
    genres: ["Animation", "Comedy"],
    languages: ["English", "Spanish"],
    rating: "PG",
    cost: "$12.00",
    showtimes: 10,
    isActive: true,
    poster: "/placeholder.svg?height=96&width=64",
  },
  {
    id: "5",
    title: "The Fall Guy",
    genres: ["Action", "Comedy"],
    languages: ["English"],
    rating: "PG-13",
    cost: "$13.00",
    showtimes: 7,
    isActive: false,
    poster: "/placeholder.svg?height=96&width=64",
  },
];

export function MoviesTable() {
  const [movieList, setMovieList] = useState(movies);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

  const handleToggleActive = (id: string) => {
    setMovieList(
      movieList.map((movie) =>
        movie.id === id ? { ...movie, isActive: !movie.isActive } : movie
      )
    );
  };

  const handleDeleteMovie = () => {
    if (movieToDelete) {
      setMovieList(movieList.filter((movie) => movie.id !== movieToDelete));
      setMovieToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Poster</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead>Languages</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Ticket Cost</TableHead>
            <TableHead>Showtimes</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movieList.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="h-12 w-8 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{movie.title}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {movie.genres.map((genre, index) => (
                    <Badge key={index} variant="outline">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {movie.languages.map((language, index) => (
                    <Badge key={index} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{movie.rating}</TableCell>
              <TableCell>{movie.cost}</TableCell>
              <TableCell>{movie.showtimes}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={movie.isActive}
                    onCheckedChange={() => handleToggleActive(movie.id)}
                  />
                  <span
                    className={
                      movie.isActive ? "text-primary" : "text-muted-foreground"
                    }
                  >
                    {movie.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
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
                      <Link to={`/movies/${movie.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/movies/${movie.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Movie
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/showtimes?movie=${movie.id}`}>
                        Manage Showtimes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setMovieToDelete(movie.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Movie
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
            <DialogTitle>
              Are you sure you want to delete this movie?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              movie and all associated showtimes and reservations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMovie}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
