import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"

// Sample data - in a real app, this would come from an API
const movieRevenue = [
  { movie: "Dune: Part Two", revenue: 45230, tickets: 1890 },
  { movie: "Deadpool & Wolverine", revenue: 38450, tickets: 2136 },
  { movie: "Furiosa: A Mad Max Saga", revenue: 32780, tickets: 1490 },
  { movie: "Inside Out 2", revenue: 36920, tickets: 2308 },
  { movie: "The Fall Guy", revenue: 28340, tickets: 1417 },
]

const dailyRevenue = [
  { date: "Mar 10", revenue: 4250 },
  { date: "Mar 11", revenue: 3980 },
  { date: "Mar 12", revenue: 5120 },
  { date: "Mar 13", revenue: 4780 },
  { date: "Mar 14", revenue: 6340 },
  { date: "Mar 15", revenue: 8920 },
  { date: "Mar 16", revenue: 7650 },
]

const COLORS = [
    "#4F46E5", // Indigo (Primary)
    "#9333EA", // Purple (Secondary)
    "#22C55E", // Green (Accent)
    "#64748B", // Slate Gray (Muted)
    "#EF4444", // Red (Destructive)
  ];
  

export function RevenueReports() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="by-movie">By Movie</TabsTrigger>
        <TabsTrigger value="by-date">By Date</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>All time revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$181,720</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Tickets Sold</CardTitle>
              <CardDescription>All time tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">9,241</div>
              <p className="text-xs text-muted-foreground">+8.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Average Ticket Price</CardTitle>
              <CardDescription>Per ticket</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$19.66</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Movie</CardTitle>
              <CardDescription>Top 5 movies by revenue</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={movieRevenue}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="movie"
                    label={({ movie, percent }) => `${movie}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {movieRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Daily Revenue</CardTitle>
              <CardDescription>Last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyRevenue}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Revenue"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Bar dataKey="revenue" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="by-movie">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue by Movie</CardTitle>
              <CardDescription>Detailed breakdown of revenue by movie</CardDescription>
            </div>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Movie</TableHead>
                  <TableHead className="text-right">Tickets Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Avg. Ticket Price</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movieRevenue.map((item) => (
                  <TableRow key={item.movie}>
                    <TableCell className="font-medium">{item.movie}</TableCell>
                    <TableCell className="text-right">{item.tickets.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${(item.revenue / item.tickets).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{((item.revenue / 181720) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">9,241</TableCell>
                  <TableCell className="text-right font-bold">$181,720</TableCell>
                  <TableCell className="text-right font-bold">$19.66</TableCell>
                  <TableCell className="text-right font-bold">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="by-date">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue by Date</CardTitle>
              <CardDescription>Daily revenue breakdown</CardDescription>
            </div>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Tickets Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Movies Shown</TableHead>
                  <TableHead className="text-right">Avg. Occupancy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyRevenue.map((item, index) => (
                  <TableRow key={item.date}>
                    <TableCell className="font-medium">{item.date}</TableCell>
                    <TableCell className="text-right">{Math.floor(item.revenue / 20)}</TableCell>
                    <TableCell className="text-right">${item.revenue}</TableCell>
                    <TableCell className="text-right">{5}</TableCell>
                    <TableCell className="text-right">{65 + index * 2}%</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total (7 days)</TableCell>
                  <TableCell className="text-right font-bold">2,052</TableCell>
                  <TableCell className="text-right font-bold">$41,040</TableCell>
                  <TableCell className="text-right font-bold">5</TableCell>
                  <TableCell className="text-right font-bold">72%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

