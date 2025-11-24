import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Shield className="h-16 w-16 text-primary" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-foreground">FarmaServe Admin</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Powerful admin panel for managing your service marketplace
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/admin/login")}
          className="mt-6"
        >
          Access Admin Panel
        </Button>
      </div>
    </div>
  );
};

export default Index;
