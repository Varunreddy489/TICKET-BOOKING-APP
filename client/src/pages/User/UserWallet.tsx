import { useState } from "react";
import {
  RefreshCcw,
  CreditCard,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface WalletTransactionsProps {
  limit?: number;
}

const walletBalance = 125.5;

const transactions = [
  {
    id: 1,
    amount: 48.0,
    type: "PAY",
    description: "Deadpool & Wolverine",
    date: "March 8, 2025",
    time: "2:15 PM",
  },
  {
    id: 2,
    amount: 100.0,
    type: "ADD",
    description: "Wallet Top-up",
    date: "March 5, 2025",
    time: "10:30 AM",
  },
  {
    id: 3,
    amount: 32.0,
    type: "PAY",
    description: "Dune: Part Two",
    date: "March 1, 2025",
    time: "4:45 PM",
  },
  {
    id: 4,
    amount: 16.0,
    type: "REFUND",
    description: "Refund - Cancelled Booking",
    date: "February 25, 2025",
    time: "11:20 AM",
  },
  {
    id: 5,
    amount: 50.0,
    type: "ADD",
    description: "Wallet Top-up",
    date: "February 20, 2025",
    time: "9:15 AM",
  },
];

const Wallet = ({ limit }: WalletTransactionsProps) => {
  const displayedTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "ADD":
        return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
      case "PAY":
        return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
      case "REFUND":
        return <RefreshCcw className="h-5 w-5 text-blue-500" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case "ADD":
      case "REFUND":
        return "text-green-500";
      case "PAY":
      case "DEDUCT":
        return "text-red-500";
      default:
        return "";
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case "ADD":
      case "REFUND":
        return "+";
      case "PAY":
      case "DEDUCT":
        return "-";
      default:
        return "";
    }
  };

  const [amount, setAmount] = useState(0);

  const handleAddMoney = () => {
    console.log(amount);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Wallet & Transactions</CardTitle>
            <CardDescription>
              Manage your wallet and view transaction history
            </CardDescription>
          </div>
          {limit && transactions.length > limit && (
            <Button variant="ghost" size="sm">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-bold">${walletBalance.toFixed(2)}</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Money</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Money To Wallet </DialogTitle>
                <DialogDescription>
                  Enter the amount you want to add to your wallet
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="col-span-3"
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddMoney} type="submit">
                  Add Money
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {displayedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date} • {transaction.time}
                  </p>
                </div>
              </div>
              <p className={`font-medium ${getAmountColor(transaction.type)}`}>
                {getAmountPrefix(transaction.type)}$
                {transaction.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      {!limit && (
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Showing {displayedTransactions.length} of {transactions.length}{" "}
            transactions
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default Wallet;
