import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { users } from "@/data/mockData";
import { Search, Eye, Ban, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Users() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (userId: number, currentStatus: string) => {
    const user = users.find((u) => u.id === userId);
    if (currentStatus === "active") {
      toast.warning(`${user?.name} has been blocked`);
    } else {
      toast.success(`${user?.name} has been unblocked`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border dark:border-slate-600 bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-foreground">
                      {user.totalBookings} bookings
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Joined {user.joinDate}
                    </p>
                  </div>

                  <Badge
                    variant={user.status === "active" ? "default" : "destructive"}
                  >
                    {user.status}
                  </Badge>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant={user.status === "active" ? "destructive" : "default"}
                    onClick={() => handleToggleStatus(user.id, user.status)}
                  >
                    {user.status === "active" ? (
                      <Ban className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
