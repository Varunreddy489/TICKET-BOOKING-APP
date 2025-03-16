"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample data - in a real app, this would come from an API
const reservations = [
  {
    id: "1",
    user: "John Doe",
    initials: "JD",
    movie: "Dune: Part Two",
    amount: "$24.00",
    status: "active",
  },
  {
    id: "2",
    user: "Alice Smith",
    initials: "AS",
    movie: "Deadpool & Wolverine",
    amount: "$18.00",
    status: "active",
  },
  {
    id: "3",
    user: "Robert Johnson",
    initials: "RJ",
    movie: "Furiosa: A Mad Max Saga",
    amount: "$22.00",
    status: "active",
  },
  {
    id: "4",
    user: "Emma Brown",
    initials: "EB",
    movie: "Inside Out 2",
    amount: "$16.00",
    status: "expired",
  },
  {
    id: "5",
    user: "Michael Davis",
    initials: "MD",
    movie: "The Fall Guy",
    amount: "$20.00",
    status: "active",
  },
]

const RecentReservations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reservations</CardTitle>
        <CardDescription>Latest ticket purchases</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback>{reservation.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{reservation.user}</p>
                <p className="text-sm text-muted-foreground">{reservation.movie}</p>
              </div>
              <div className="ml-auto font-medium">{reservation.amount}</div>
              <div className="ml-2">
                <Badge variant={reservation.status === "active" ? "default" : "secondary"}>{reservation.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentReservations