'use client'

import { useParams } from 'next/navigation'
import { products } from '@/data/products'
import ProductCard from '@/components/common/ProductCard'
import { SlidersHorizontal } from 'lucide-react'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug
  
  const filteredProducts = slug === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(slug))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">
            {slug === 'all' ? 'All Products' : slug.replace('-', ' ')}
          </h1>
          <p className="text-black/40 mt-1">{filteredProducts.length} products</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-black transition">
          <SlidersHorizontal size={16} />
          <span className="text-sm">Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}