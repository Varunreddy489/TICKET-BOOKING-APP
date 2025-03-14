import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReviewStore } from "@/store/useReviewStore";

export function ReviewForm({ movieId }: { movieId: number }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { createReview } = useReviewStore();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    const userData = storedData ? JSON.parse(storedData) : null;
    setUserId(userData?.id || null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("User is not logged in.");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (content.trim().length < 10) {
      setError("Review must be at least 10 characters");
      return;
    }

    setError(null);

    try {
      setIsSubmitting(true);
      const response = await createReview(movieId, { userId, rating, content });
      console.log(response);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setError("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <div className="flex items-center" id="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }`}
              />
              <span className="sr-only">{star} stars</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Your Review</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this movie..."
          rows={5}
        />
      </div>

      {error && <div className="text-destructive text-sm">{error}</div>}

      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          className={`isSubmitting ? "bg-gray-400 ":"bg-black"`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}
