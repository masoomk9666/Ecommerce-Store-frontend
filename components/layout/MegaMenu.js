'use client'

import Link from 'next/link'

export default function MegaMenu() {
  const categories = [
    { name: 'New Arrivals', href: '/category/new' },
    { name: 'Best Sellers', href: '/category/best-sellers' },
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Fashion', href: '/category/fashion' },
    { name: 'Accessories', href: '/category/accessories' },
    { name: 'Home & Living', href: '/category/home' },
  ]

  return (
    <div className="hidden lg:block absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="text-sm hover:text-black/60 transition"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}