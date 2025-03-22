import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { CreditCard, Film, Info, Ticket, Wallet } from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import Spinner from "./ui/Spinner";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useWalletStore } from "@/store/useWalletStore";
import { useTicketStore } from "@/store/useTicketStore";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BookingSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieDetails: {
    id: number;
    title: string;
    poster: string;
    showtime: string;
    date: string;
  };
  seats: string[];
  ticketPrice: number;
  convenienceFee: number;
}

export function BookingDialog({
  open,
  onOpenChange,
  movieDetails,
  seats,
  ticketPrice,
  convenienceFee,
}: BookingSummaryProps) {
  // const navigate = useNavigate();
  const { bookData, bookTickets } = useTicketStore();
  const { walletData, error, isLoading, getWallet } = useWalletStore();

  if (error) return <div>{error}</div>;

  const storedUser = localStorage.getItem("userId");
  const userId = storedUser ? JSON.parse(storedUser) : null;
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  useEffect(() => {
    getWallet(userId);
  }, [userId]);

  const totalTicketCost = seats.length * ticketPrice;
  const totalCost = totalTicketCost + convenienceFee;
  const walletBalance = walletData?.balance || 0;
  const hasEnoughBalance = walletBalance >= totalCost;

  const movieData = {
    count: seats.length,
    userId,
    cost: totalCost,
    timing: movieDetails.showtime,
    seatNumber: seats,
  };

  const movieId = movieDetails?.id;

  if (isLoading) return <Spinner />;
  const handleConfirmPayment = async () => {
    await bookTickets(movieId, movieData);
  };

  console.log("bookingsummary", bookData);

  // if (bookData?.success) {
  //   navigate("/success");
  // }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Booking Summary
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This money will be deducted from your wallet
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />

        <div className="space-y-6 py-4">
          {/* Movie Details */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-start gap-4 p-4">
                <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={movieDetails.poster}
                    alt={movieDetails.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{movieDetails.title}</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Film className="h-4 w-4" />
                    <span>{movieDetails.date}</span>
                    <span>•</span>
                    <span>{movieDetails.showtime}</span>
                  </div>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Ticket className="h-3 w-3" />
                      {seats.length} {seats.length === 1 ? "Seat" : "Seats"}:{" "}
                      {seats.join(", ")}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <div className="space-y-3 rounded-lg border p-4">
            <h3 className="font-medium">Cost Breakdown</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Ticket className="h-4 w-4" />
                Ticket Cost ({seats.length} × ${ticketPrice.toFixed(2)})
              </span>
              <span>${totalTicketCost.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Info className="h-4 w-4" />
                Convenience Fee
              </span>
              <span>${convenienceFee.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Cost</span>
              <span className="text-lg font-bold">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="font-medium">Payment Method</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="wallet"
                  id="wallet"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="wallet"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Wallet className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">Wallet</span>
                  <span
                    className={`mt-1 text-xs ${
                      hasEnoughBalance ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Balance: ${walletBalance.toFixed(2)}
                  </span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="stripe"
                  id="stripe"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="stripe"
                  className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <CreditCard className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">Credit Card</span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    Powered by Stripe
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="mb-2 sm:mb-0"
          >
            Cancel
          </Button>
          <Button
            className="relative overflow-hidden"
            disabled={
              paymentMethod === "wallet" && !hasEnoughBalance && isLoading
            }
            onClick={handleConfirmPayment}
          >
            <span className="relative z-10">Confirm & Pay</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
