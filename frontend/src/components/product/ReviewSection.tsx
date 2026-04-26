import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  _id: string;
  username: string;
  rating: number;
  comment: string;
}

const ReviewSection = ({ productId }: { productId: string }) => {

  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const username = localStorage.getItem("username");

  // Load reviews
  useEffect(() => {

    axios
      .get(`https://vov-foods-1.onrender.com/api/reviews/${productId}`)
      .then((res) => setReviews(res.data))
      .catch(() => console.log("Failed to load reviews"));

  }, [productId]);

  // Submit review
  const submitReview = async () => {

    if (!username) {
      alert("Please login to write a review");
      return;
    }

    if (!comment) {
      alert("Please write a review");
      return;
    }

    try {

      const res = await axios.post(
        "https://vov-foods-1.onrender.com/api/reviews",
        {
          productId,
          username,
          rating,
          comment
        }
      );

      setReviews([res.data, ...reviews]);
      setComment("");

    } catch {
      alert("Failed to add review");
    }

  };

  // Average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="mt-16 border-t pt-10">

      <h2 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h2>

      {/* Rating Summary + Breakdown */}

      <div className="grid md:grid-cols-2 gap-10 mb-10">

        {/* Average Rating */}

        <div className="flex items-center gap-6">

          <div className="text-5xl font-bold">
            {avgRating}
          </div>

          <div>

            <div className="flex mb-1">

              {[1,2,3,4,5].map((s)=>(
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= Math.round(Number(avgRating))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}

            </div>

            <p className="text-sm text-muted-foreground">
              Based on {reviews.length} reviews
            </p>

          </div>

        </div>

        {/* Rating Breakdown */}

        <div className="space-y-3">

          {[5,4,3,2,1].map((star)=>{

            const count = reviews.filter(r => r.rating === star).length;

            const percent = reviews.length
              ? (count / reviews.length) * 100
              : 0;

            return (

              <div key={star} className="flex items-center gap-3">

                <span className="text-sm w-6">{star}★</span>

                <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">

                  <div
                    className="bg-yellow-400 h-2"
                    style={{ width: `${percent}%` }}
                  />

                </div>

                <span className="text-sm text-muted-foreground w-8">
                  {count}
                </span>

              </div>

            );

          })}

        </div>

      </div>

      {/* Write Review */}

      <div className="border rounded-xl p-6 mb-10 bg-muted/30">

        <h3 className="font-semibold mb-4">
          Write a Review
        </h3>

        {/* Clickable Stars */}

        <div className="flex gap-2 mb-4">

          {[1,2,3,4,5].map((star)=>(
            <Star
              key={star}
              onClick={()=>setRating(star)}
              className={`w-6 h-6 cursor-pointer ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}

        </div>

        <textarea
          placeholder="Share your experience with this product..."
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <Button onClick={submitReview}>
          Submit Review
        </Button>

      </div>

      {/* Reviews List */}

      <div className="space-y-6">

        {reviews.length === 0 && (
          <p className="text-muted-foreground">
            No reviews yet. Be the first to review!
          </p>
        )}

        {reviews.map((r)=>(
          <div
            key={r._id}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >

            <div className="flex justify-between items-center mb-2">

              <p className="font-semibold">
                {r.username}
              </p>

              <div className="flex">

                {[...Array(r.rating)].map((_,i)=>(
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

            </div>

            <p className="text-muted-foreground">
              {r.comment}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ReviewSection;