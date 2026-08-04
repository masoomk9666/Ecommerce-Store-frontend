'use client'

import { User, Package, Heart, MapPin, Bell, Settings } from 'lucide-react'
import Link from 'next/link'

export default function AccountPage() {
  const menuItems = [
    { icon: Package, label: 'Orders', href: '/account/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
    { icon: User, label: 'Profile', href: '/account/profile' },
    { icon: Bell, label: 'Notifications', href: '/account/notifications' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Account</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="card-premium p-6 flex items-center gap-4 hover:shadow-lg transition"
          >
            <item.icon size={24} className="text-black/40" />
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-sm text-black/40">Manage your {item.label.toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}