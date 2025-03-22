import { useEffect, useState } from "react";
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
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/store/useWalletStore";

interface WalletProps {
  limit?: number;
  fullWidth?: boolean;
}

const Wallet = ({ limit, fullWidth }: WalletProps) => {
  const storedUser = localStorage.getItem("userId");

  const userId = storedUser ? JSON.parse(storedUser) : null;
  const [amount, setAmount] = useState(0);

  const {
    addMoney,
    getTransactions,
    walletData,
    getWallet,
    isLoading,
    transactions,
    error,
  } = useWalletStore();

  const handleAddMoney = async () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }
    console.log("Amount to add:", amount); // Debug the amount
    try {
      const response = await addMoney(userId, amount);

      console.log("Add money response:", response);
    } catch (error: any) {
      console.error("Failed to add money:", error);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (isLoading) {
    <Spinner />;
  }

  useEffect(() => {
    getWallet(userId);
    getTransactions(userId);
  }, [userId]);

  if (!transactions) {
    console.log("No transactions found");
  }

  // const displayedTransactions = limit
  //   ? transactions.slice(0, limit)
  //   : transactions;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "ADD":
        return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
      case "DEDUCT":
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

  return (
    <Card className="h-full  ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Wallet & Transactions</CardTitle>
            <CardDescription>
              Manage your wallet and view transaction history
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-2xl font-bold">${walletData?.balance}</p>
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
        <div className={` grid ${fullWidth ? "grid-cols-2" : ""} space-y-3  space-x-3 `}>
          {transactions?.slice(0, limit).map((transaction: any) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                {getTransactionIcon(transaction.type)}
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {/*  //* { data} • {time} */}

                    {transaction.createdAt
                      ? new Date(transaction.createdAt).toLocaleString()
                      : "Unknown date"}
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
      <CardFooter>
        {/* <div className="text-sm text-muted-foreground">
          {(transactions?.length ?? 0) > 10
            ? `Showing 10 of ${transactions?.length} transactions`
            : "For More Visit  wallets tab "}
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default Wallet;
