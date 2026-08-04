'use client'

import { motion } from 'framer-motion'
import { products } from '@/data/products'
import ProductCard from '@/components/common/ProductCard'
import { ArrowRight, Truck, Shield, Star, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const featured = products.slice(0, 4)
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4)
  const newArrivals = products.filter(p => p.isNew).slice(0, 4)

  // Don't render animations on the server
  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Static version */}
        <section className="relative rounded-[32px] overflow-hidden bg-black text-white mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10" />
          <div className="relative z-20 px-8 py-20 md:py-32 md:px-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              Premium Essentials
              <br />
              <span className="text-white/70">for Every Day</span>
            </h1>
            <p className="mt-4 text-white/60 text-lg max-w-md">
              Discover our curated collection of timeless pieces designed to elevate your daily life.
            </p>
            <button className="mt-8 bg-white text-black rounded-full px-8 py-4 font-medium hover:bg-white/90 transition flex items-center gap-2">
              Explore Collection <ArrowRight size={18} />
            </button>
          </div>
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero/1600/800')] bg-cover bg-center opacity-30" />
        </section>

        {/* Features - Static */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Truck, label: 'Free Shipping', desc: 'On orders over $100' },
            { icon: Shield, label: 'Secure Payment', desc: '100% protected' },
            { icon: Star, label: 'Premium Quality', desc: 'Curated with care' },
            { icon: Clock, label: 'Easy Returns', desc: '30-day guarantee' },
          ].map((feature, i) => (
            <div key={i} className="card-premium p-4 text-center">
              <feature.icon className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium text-sm">{feature.label}</p>
              <p className="text-xs text-black/40">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Featured Collections */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
            <button className="text-sm font-medium hover:text-black/60 transition flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Best Sellers</h2>
            <button className="text-sm font-medium hover:text-black/60 transition flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
            <button className="text-sm font-medium hover:text-black/60 transition flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="card-premium p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Stay in the Loop</h2>
          <p className="text-black/60 mt-2">Subscribe for exclusive drops and early access</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="input-premium flex-1"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </section>
      </div>
    )
  }

  // Animated version for client
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <motion.section 
        className="relative rounded-[32px] overflow-hidden bg-black text-white mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 z-10" />
        <div className="relative z-20 px-8 py-20 md:py-32 md:px-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Premium Essentials
            <br />
            <span className="text-white/70">for Every Day</span>
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-md">
            Discover our curated collection of timeless pieces designed to elevate your daily life.
          </p>
          <button className="mt-8 bg-white text-black rounded-full px-8 py-4 font-medium hover:bg-white/90 transition flex items-center gap-2">
            Explore Collection <ArrowRight size={18} />
          </button>
        </div>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/hero/1600/800')] bg-cover bg-center opacity-30" />
      </motion.section>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { icon: Truck, label: 'Free Shipping', desc: 'On orders over $100' },
          { icon: Shield, label: 'Secure Payment', desc: '100% protected' },
          { icon: Star, label: 'Premium Quality', desc: 'Curated with care' },
          { icon: Clock, label: 'Easy Returns', desc: '30-day guarantee' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="card-premium p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <feature.icon className="w-6 h-6 mx-auto mb-2" />
            <p className="font-medium text-sm">{feature.label}</p>
            <p className="text-xs text-black/40">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Featured Collections */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
          <Link href="/category/all" className="text-sm font-medium hover:text-black/60 transition flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Best Sellers</h2>
          <Link href="/category/all" className="text-sm font-medium hover:text-black/60 transition flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
          <Link href="/category/all" className="text-sm font-medium hover:text-black/60 transition flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="card-premium p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Stay in the Loop</h2>
        <p className="text-black/60 mt-2">Subscribe for exclusive drops and early access</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="input-premium flex-1"
          />
          <button className="btn-primary whitespace-nowrap">Subscribe</button>
        </div>
      </section>
    </div>
  )
}