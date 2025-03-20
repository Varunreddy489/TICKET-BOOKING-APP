import { Calendar, Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MovieRecommendationsProps {
  fullWidth?: boolean;
}

const movies = [
  {
    id: 1,
    title: "The Batman",
    genre: "Action, Crime, Drama",
    rating: 4.5,
    releaseDate: "March 30, 2025",
    duration: "2h 56m",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 2,
    title: "Furiosa: A Mad Max Saga",
    genre: "Action, Adventure, Sci-Fi",
    rating: 4.2,
    releaseDate: "April 15, 2025",
    duration: "2h 30m",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    title: "Gladiator II",
    genre: "Action, Drama, History",
    rating: 4.7,
    releaseDate: "May 5, 2025",
    duration: "2h 45m",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 4,
    title: "Twisters",
    genre: "Action, Adventure, Drama",
    rating: 3.9,
    releaseDate: "April 2, 2025",
    duration: "2h 10m",
    image: "/placeholder.svg?height=300&width=200",
  },
];
const MovieRecommendations = ({
  fullWidth = false,
}: MovieRecommendationsProps) => {
  const displayedMovies = fullWidth ? movies : movies.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended For You</CardTitle>
        <CardDescription>
          Based on your viewing history and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`grid grid-cols-1 ${
            fullWidth ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"
          } gap-4`}
        >
          {displayedMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col overflow-hidden rounded-lg border"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.image || "/placeholder.svg"}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {movie.genre}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{movie.rating}/5</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{movie.duration}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>Release: {movie.releaseDate}</span>
                </div>
                <Button className="mt-4" size="sm">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieRecommendations;
