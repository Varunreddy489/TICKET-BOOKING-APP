import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample data - in a real app, this would come from an API
const movies = [
  {
    id: "1",
    title: "Dune: Part Two",
    occupancy: 92,
    revenue: "$45,230",
  },
  {
    id: "2",
    title: "Deadpool & Wolverine",
    occupancy: 87,
    revenue: "$38,450",
  },
  {
    id: "3",
    title: "Furiosa: A Mad Max Saga",
    occupancy: 78,
    revenue: "$32,780",
  },
  {
    id: "4",
    title: "Inside Out 2",
    occupancy: 85,
    revenue: "$36,920",
  },
  {
    id: "5",
    title: "The Fall Guy",
    occupancy: 72,
    revenue: "$28,340",
  },
];

export function PopularMovies() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Movies</CardTitle>
        <CardDescription>
          Top performing movies by occupancy rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {movies.map((movie) => (
            <div key={movie.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{movie.title}</div>
                <div className="text-sm text-muted-foreground">
                  {movie.revenue}
                </div>
              </div>
              <Progress value={movie.occupancy} className="h-2" />
              <div className="text-xs text-muted-foreground text-right">
                {movie.occupancy}% occupancy
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
    