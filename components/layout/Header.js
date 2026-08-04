'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cartStore.js'
import { useWishlistStore } from '@/store/wishlistStore'
import SearchModal from '../common/SearchModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const cartItems = useCartStore(state => state.items)
  const wishlistItems = useWishlistStore(state => state.items)
  
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlistItems.length

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tight">
              NOVA
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/category/all" className="text-sm font-medium hover:text-black/60 transition">
                New Arrivals
              </Link>
              <Link href="/category/all" className="text-sm font-medium hover:text-black/60 transition">
                Best Sellers
              </Link>
              <Link href="/category/all" className="text-sm font-medium hover:text-black/60 transition">
                Collections
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full hover:bg-black/5 transition"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              
              <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-black/5 transition">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link href="/cart" className="relative p-2 rounded-full hover:bg-black/5 transition">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <Link href="/account" className="p-2 rounded-full hover:bg-black/5 transition">
                <User size={20} />
              </Link>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-black/5 transition"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-6 space-y-4">
              <Link href="/category/all" className="block text-sm font-medium">New Arrivals</Link>
              <Link href="/category/all" className="block text-sm font-medium">Best Sellers</Link>
              <Link href="/category/all" className="block text-sm font-medium">Collections</Link>
              <Link href="/category/all" className="block text-sm font-medium">Electronics</Link>
              <Link href="/category/all" className="block text-sm font-medium">Fashion</Link>
              <Link href="/category/all" className="block text-sm font-medium">Accessories</Link>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}