import { Star } from "lucide-react";
import { useUser } from "@clerk/clerk-react";


import { Review } from "@/types/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ReviewCard({ review }: { review: Review }) {
  const formattedDate = review.createdAt
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(review.createdAt))
    : "Unknown date"; // Fallback text for invalid dates

  const { user } = useUser();
  const userName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "Guest";

  // Get initials for avatar fallback
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage alt={userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="font-semibold">{userName}</h3>
              <span className="text-sm text-muted-foreground">
                {formattedDate}
              </span>
            </div>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{review.content}</p>
      </CardContent>
    </Card>
  );
}
