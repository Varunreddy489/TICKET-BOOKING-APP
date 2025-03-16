import { Film, Ticket, DollarSign, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Reservations",
      value: "3,248",
      change: "+12.5%",
      icon: Ticket,
    },
    {
      title: "Total Revenue",
      value: "$45,678",
      change: "+18.2%",
      icon: DollarSign,
    },
    {
      title: "Active Movies",
      value: "24",
      change: "+2",
      icon: Film,
    },
    {
      title: "Seat Occupancy",
      value: "72%",
      change: "+5.3%",
      icon: Percent,
    },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
