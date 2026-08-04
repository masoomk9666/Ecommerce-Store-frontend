'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { products } from '@/data/products'
import Link from 'next/link'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const results = query.length > 0 
    ? products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-white max-w-2xl w-full mx-auto mt-20 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center gap-3">
              <Search size={20} className="text-black/40" />
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent focus:outline-none text-lg"
                autoFocus
              />
              <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            {results.length > 0 && (
              <div className="p-2 max-h-96 overflow-y-auto">
                {results.map(product => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 hover:bg-black/5 rounded-xl transition"
                  >
                    <div className="w-12 h-12 bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image || `https://picsum.photos/seed/${product.id}/100/100`} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-black/40">{product.brand} · ${product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {query.length > 0 && results.length === 0 && (
              <div className="p-8 text-center text-black/40">
                No products found for "{query}"
              </div>
            )}
            
            {query.length === 0 && (
              <div className="p-8 text-center text-black/40">
                Search for products, brands, or categories
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}