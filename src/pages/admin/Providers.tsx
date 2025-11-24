import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { providers } from "@/data/mockData";
import { Search, Eye, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Providers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || provider.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Providers</h1>
          <p className="text-muted-foreground">Manage service providers</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>All Providers</CardTitle>
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border dark:border-slate-600 bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-foreground">
                      {provider.businessName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {provider.category} • {provider.subcategory}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-foreground">
                      ⭐ {provider.rating}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {provider.totalReviews} reviews
                    </p>
                  </div>

                  <Badge
                    variant={
                      provider.status === "active"
                        ? "default"
                        : provider.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {provider.status}
                  </Badge>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/admin/providers/${provider.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredProviders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No providers found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
