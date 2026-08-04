'use client'

import Link from 'next/link'
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore.js'
import ProductCard from '@/components/common/ProductCard'
import { products } from '@/data/products'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore()
  const recommendations = products.slice(0, 3)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Your cart is empty</h2>
        <p className="text-black/60 mt-2 text-sm md:text-base">Start shopping to add items</p>
        <Link href="/" className="btn-primary mt-6 inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card-premium p-3 sm:p-4 flex gap-3 sm:gap-4 items-center">
              {/* Product Image */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#f5f5f5] rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.image || `https://picsum.photos/seed/${item.id}/200/200`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.id}`} className="font-medium text-sm sm:text-base hover:underline line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-xs sm:text-sm text-black/40">{item.brand}</p>
                <p className="font-semibold text-sm sm:text-base">${item.price}</p>
              </div>
              
              {/* Quantity Controls - Mobile friendly */}
              <div className="flex flex-col items-end gap-2 sm:gap-3">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} className="sm:w-4 sm:h-4" />
                  </button>
                  <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} className="sm:w-4 sm:h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-1 text-black/40 hover:text-red-500 transition"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - Sticky on desktop */}
        <div className="lg:col-span-1">
          <div className="card-premium p-4 sm:p-6 lg:sticky lg:top-24">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Order Summary</h3>
            
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="text-black/60">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Shipping</span>
                <span className="text-black/60 text-sm">Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Link href="/checkout" className="btn-primary w-full text-center mt-4 sm:mt-6 flex items-center justify-center gap-2 text-sm sm:text-base py-3 sm:py-4">
              Proceed to Checkout <ArrowRight size={18} className="sm:w-[20px] sm:h-[20px]" />
            </Link>
            
            <p className="text-xs text-black/40 text-center mt-3">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <section className="mt-12 sm:mt-16">
        <h3 className="text-lg sm:text-xl font-bold mb-4">You might also like</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}