'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWishlistStore } from '@/store/wishlistStore.js'
import { useCartStore } from '@/store/cartStore.js'
import RatingStars from './RatingStars'

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const addToCart = useCartStore(state => state.addItem)
  const isWishlisted = isInWishlist(product.id)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    toggleItem(product)
  }

  const imageUrl = imageError 
    ? `https://picsum.photos/seed/${product.id}/400/400`
    : product.image || `https://picsum.photos/seed/${product.id}/400/400`

  // Static version without motion for server
  if (!isMounted) {
    return (
      <div className="group relative card-premium overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="relative aspect-square bg-[#f5f5f5] overflow-hidden">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.isNew && (
                <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-medium tracking-wide">
                  NEW
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-[#007aff] text-white text-[10px] px-3 py-1 rounded-full font-medium tracking-wide">
                  BEST SELLER
                </span>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2">
              <button 
                onClick={handleAddToCart}
                className="bg-white/90 backdrop-blur-md text-black rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-lg hover:bg-white transition"
              >
                <ShoppingBag size={16} /> Add
              </button>
              <button 
                onClick={handleWishlist}
                className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition"
              >
                <Heart size={18} className={isWishlisted ? 'fill-black' : ''} />
              </button>
              <Link 
                href={`/products/${product.id}`}
                className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition"
              >
                <Eye size={18} />
              </Link>
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-black/40 font-medium uppercase tracking-wider">
                  {product.brand}
                </p>
                <h3 className="font-medium text-sm mt-0.5 line-clamp-1">
                  {product.name}
                </h3>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base">${product.price}</span>
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <RatingStars rating={product.rating} />
                    <span className="text-xs text-black/40">({product.reviews})</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // Animated version for client
  return (
    <motion.div
      className="group relative card-premium overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square bg-[#f5f5f5] overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full font-medium tracking-wide">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-[#007aff] text-white text-[10px] px-3 py-1 rounded-full font-medium tracking-wide">
                BEST SELLER
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleAddToCart}
              className="bg-white/90 backdrop-blur-md text-black rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-lg hover:bg-white transition"
            >
              <ShoppingBag size={16} /> Add
            </button>
            <button 
              onClick={handleWishlist}
              className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition"
            >
              <Heart size={18} className={isWishlisted ? 'fill-black' : ''} />
            </button>
            <Link 
              href={`/products/${product.id}`}
              className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-lg hover:bg-white transition"
            >
              <Eye size={18} />
            </Link>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-black/40 font-medium uppercase tracking-wider">
                {product.brand}
              </p>
              <h3 className="font-medium text-sm mt-0.5 line-clamp-1">
                {product.name}
              </h3>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base">${product.price}</span>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <RatingStars rating={product.rating} />
                  <span className="text-xs text-black/40">({product.reviews})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}