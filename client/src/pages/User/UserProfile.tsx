// import { useParams } from "react-router-dom";
import { Edit, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const UserProfile = () => {
  // const {id }= useParams();

  const userData = localStorage.getItem("userData");

  const user = userData ? JSON.parse(userData) : null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Profile</CardTitle>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          <span>Edit Profile</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="relative h-24 w-24 overflow-hidden rounded-full bg-primary/10">
            <User className="h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{user.name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {user.role}
              </div>
              <div className="rounded-full bg-muted px-3 py-1 text-sm">
                Member since{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : "Unknown date"}
              </div>
              <div className="rounded-full bg-muted px-3 py-1 text-sm">
                {user.totalBookings} Bookings
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
