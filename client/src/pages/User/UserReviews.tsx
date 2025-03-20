import { useState } from "react";
import { Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserReviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      movieName: "Dune: Part Two",
      rating: 5,
      content:
        "Absolutely stunning visually and narratively. Denis Villeneuve has created a masterpiece that expands on the first film in every way. The performances, especially by Timothée Chalamet and Zendaya, are exceptional.",
      date: "March 16, 2025",
      image: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 2,
      movieName: "Oppenheimer",
      rating: 4,
      content:
        "Christopher Nolan delivers another thought-provoking film with outstanding performances. Cillian Murphy perfectly captures the complexity of J. Robert Oppenheimer. The non-linear storytelling works well for this historical drama.",
      date: "March 1, 2025",
      image: "/placeholder.svg?height=80&width=60",
    },
    {
      id: 3,
      movieName: "Barbie",
      rating: 4,
      content:
        "A surprisingly deep and thoughtful film wrapped in bright pink packaging. Greta Gerwig's direction and Margot Robbie's performance make this much more than just a movie about a doll. Funny, smart, and unexpectedly moving.",
      date: "February 22, 2025",
      image: "/placeholder.svg?height=80&width=60",
    },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Reviews & Ratings</CardTitle>
        <CardDescription>
          Reviews and ratings you've left for movies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex gap-4 p-4 rounded-lg border">
              <div className="flex-shrink-0 hidden sm:block">
                <img
                  src={review.image || "/placeholder.svg"}
                  alt={review.movieName}
                  className="rounded-md object-cover h-[80px] w-[60px]"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-semibold">{review.movieName}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Star className="h-12 w-12 mx-auto text-muted-foreground opacity-20" />
            <h3 className="mt-4 text-lg font-medium">No reviews yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You haven't reviewed any movies yet. After watching a movie, come
              back to share your thoughts!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserReviews;
