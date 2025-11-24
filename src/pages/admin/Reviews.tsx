import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { reviews } from "@/data/mockData";
import { Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function Reviews() {
  const handleDeleteReview = (reviewId: number, userName: string) => {
    toast.error(`Review by ${userName} has been deleted`);
  };

  const handleVerifyReview = (reviewId: number, userName: string) => {
    toast.success(`Review by ${userName} has been verified`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reviews</h1>
        <p className="text-muted-foreground">Moderate user reviews</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`p-4 rounded-lg border ${
                  review.reports > 0
                    ? "border-destructive bg-destructive/5"
                    : "border-border dark:border-slate-600 bg-card hover:bg-muted/50"
                } transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">
                          {review.userName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {review.providerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-warning"
                                  : "text-muted-foreground"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        {review.verified ? (
                          <Badge variant="default">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Unverified</Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-foreground mb-2">
                      {review.comment}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <p className="text-xs text-muted-foreground">
                          {review.date}
                        </p>
                        {review.reports > 0 && (
                          <Badge variant="destructive">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {review.reports} reports
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {!review.verified && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              handleVerifyReview(review.id, review.userName)
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Verify
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleDeleteReview(review.id, review.userName)
                          }
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
