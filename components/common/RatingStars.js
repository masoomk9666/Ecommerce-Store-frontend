import { Star } from 'lucide-react'

export default function RatingStars({ rating }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.floor(rating) ? 'fill-black text-black' : 'text-gray-300'}
        />
      ))}
    </div>
  )
}