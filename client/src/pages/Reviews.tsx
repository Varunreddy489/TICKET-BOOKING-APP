import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Star, StarHalf } from "lucide-react";
// import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewCard } from "@/components/ReviewCard";
import { Separator } from "@/components/ui/separator";
import { useReviewStore } from "../store/useReviewStore";

const Reviews = ({
  movieId,
  movieName,
}: {
  movieId: number;
  movieName: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { reviews, isLoading, error, getAllReviews } = useReviewStore();

  // const router = useNavigate()

  useEffect(() => {
    getAllReviews(movieId);
  }, [movieId]);

  const safeReviews = reviews ?? [];
  const averageRating =
    safeReviews.length > 0
      ? safeReviews.reduce((acc, review) => acc + review.rating, 0) /
        safeReviews.length
      : 0;

  const { user } = useUser();
  const isAuthenticated = !!user;

  if (isLoading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Reviews</h2>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  if (star <= Math.floor(averageRating)) {
                    return (
                      <Star
                        key={star}
                        className="w-5 h-5 text-white fill-primary "
                      />
                    );
                  } else if (star - 0.5 <= averageRating) {
                    return (
                      <StarHalf
                        key={star}
                        className="w-5 h-5  fill-primary text-primary"
                      />
                    );
                  } else {
                    return (
                      <Star
                        key={star}
                        className="w-5 h-5 text-muted-foreground"
                      />
                    );
                  }
                })}
              </div>
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className=" text-white ml-2">
                ({reviews?.length} reviews)
              </span>
            </div>
          </div>

          {isAuthenticated && (
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="mt-4 md:mt-0"
            >
              Write a Review
            </Button>
          )}
        </div>

        <Separator className="my-6" />

        {safeReviews.length > 0 ? (
          <div className="space-y-6 grid grid-cols-1 flex-grow md:grid-cols-2 gap-6 ">
            {safeReviews?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No reviews yet. Be the first to review this movie!
            </p>
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>
                Share your thoughts about {movieName}
              </DialogDescription>
            </DialogHeader>
            <ReviewForm movieId={movieId} />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Reviews;
