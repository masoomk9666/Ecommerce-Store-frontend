'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import ProductCard from '@/components/common/ProductCard'

export default function WishlistPage() {
  const items = useWishlistStore(state => state.items)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Heart size={48} className="mx-auto text-black/20 mb-4" />
        <h2 className="text-3xl font-bold">Your wishlist is empty</h2>
        <p className="text-black/60 mt-2">Save items you love</p>
        <Link href="/" className="btn-primary mt-6 inline-block">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}