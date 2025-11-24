import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { providers } from "@/data/mockData";
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle, XCircle, Ban } from "lucide-react";
import { toast } from "sonner";

export default function ProviderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = providers.find((p) => p.id === Number(id));

  if (!provider) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Provider not found</p>
        <Button onClick={() => navigate("/admin/providers")} className="mt-4">
          Back to Providers
        </Button>
      </div>
    );
  }

  const handleApprove = () => {
    toast.success(`${provider.businessName} has been approved`);
  };

  const handleReject = () => {
    toast.error(`${provider.businessName} has been rejected`);
  };

  const handleBlock = () => {
    toast.warning(`${provider.businessName} has been blocked`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin/providers")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center text-center">
              <img
                src={provider.image}
                alt={provider.name}
                className="h-24 w-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-bold text-foreground">
                {provider.businessName}
              </h2>
              <p className="text-sm text-muted-foreground">{provider.name}</p>
              <Badge
                className="mt-2"
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
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{provider.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{provider.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{provider.location}</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <Button
                className="w-full"
                variant="default"
                onClick={handleApprove}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={handleReject}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                className="w-full"
                variant="destructive"
                onClick={handleBlock}
              >
                <Ban className="h-4 w-4 mr-2" />
                Block Provider
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium text-foreground">{provider.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Subcategory</p>
                  <p className="font-medium text-foreground">{provider.subcategory}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-medium text-foreground">
                    ⭐ {provider.rating} ({provider.totalReviews} reviews)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium text-foreground">{provider.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Services & Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {provider.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {service.duration}
                      </p>
                    </div>
                    <p className="font-bold text-foreground">${service.price}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {provider.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verification Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(provider.documents).map(([doc, status]) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <p className="font-medium text-foreground capitalize">{doc}</p>
                    <Badge
                      variant={status === "verified" ? "default" : "secondary"}
                    >
                      {status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
