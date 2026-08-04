'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Heart, ShoppingBag, Truck, Shield, RefreshCw } from 'lucide-react'
import { products } from '@/data/products'
import { useCartStore } from '@/store/cartStore.js'
import { useWishlistStore } from '@/store/wishlistStore.js'
import ProductCard from '@/components/common/ProductCard'
import RatingStars from '@/components/common/RatingStars'

export default function ProductDetailPage() {
  const params = useParams()
  const [isMounted, setIsMounted] = useState(false)
  
  // Get the slug from params
  const slug = params.slug
  // Convert slug to number (since we're using numeric IDs)
  const productId = parseInt(slug)
  const product = products.find(p => p.id === productId)
  
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  
  const addToCart = useCartStore(state => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  
  useEffect(() => {
    setIsMounted(true)
    if (product) {
      setSelectedColor(product.colors?.[0] || '')
      setSelectedSize(product.sizes?.[0] || '')
    }
  }, [product])

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-24"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold">Product not found</h2>
        <p className="text-black/60 mt-2">The product you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary mt-6 inline-block">
          Back to Shop
        </Link>
      </div>
    )
  }

  const isWishlisted = isInWishlist(product.id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm hover:text-black/60 transition mb-6">
        <ChevronLeft size={16} /> Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-[#f5f5f5] rounded-2xl overflow-hidden relative">
            <Image
              src={product.image || `https://picsum.photos/seed/${product.id}/800/800`}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden relative">
                <Image
                  src={`https://picsum.photos/seed/${product.id}${i}/200/200`}
                  alt={`${product.name} view ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-black/40 font-medium uppercase tracking-wider">{product.brand}</p>
            <h1 className="text-3xl font-bold tracking-tight mt-1">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-black/40">({product.reviews} reviews)</span>
              {product.stock > 0 && (
                <span className="text-sm text-green-600 font-medium">In Stock</span>
              )}
            </div>
          </div>

          <p className="text-3xl font-bold">${product.price}</p>
          <p className="text-black/60">{product.description}</p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Color: {selectedColor}</p>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      selectedColor === color ? 'border-black' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Size: {selectedSize}</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full border transition ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button 
              onClick={() => toggleItem(product)}
              className="p-3 rounded-full border border-gray-200 hover:border-black transition"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={20} className={isWishlisted ? 'fill-black' : ''} />
            </button>
          </div>

          {/* Shipping info */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-start gap-3">
              <Truck size={18} className="text-black/40 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Free shipping</p>
                <p className="text-xs text-black/40">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield size={18} className="text-black/40 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Secure checkout</p>
                <p className="text-xs text-black/40">Encrypted payment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw size={18} className="text-black/40 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Easy returns</p>
                <p className="text-xs text-black/40">30-day guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6">You may also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}