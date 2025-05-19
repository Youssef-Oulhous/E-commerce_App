import { Star, StarHalf, Star as StarOutline } from "lucide-react"; // or use react-icons

type RatingProps = {
  rating: number; // e.g. 4.2
};

const StarRating = ({ rating }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-500">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} fill="currentColor" stroke="currentColor" />
      ))}
      {hasHalfStar && (
        <StarHalf fill="currentColor" stroke="currentColor" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline
          key={`empty-${i}`}
          fill="none"
          stroke="currentColor"
          className="opacity-30"
        />
      ))}
    </div>
  );
};

export default StarRating ;
