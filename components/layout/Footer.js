import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 mt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg">NOVA</h4>
            <p className="text-sm text-black/40 mt-2">Premium essentials for modern living.</p>
          </div>
          <div>
            <h5 className="font-medium mb-3">Shop</h5>
            <div className="space-y-2 text-sm">
              <Link href="#" className="block text-black/40 hover:text-black">New Arrivals</Link>
              <Link href="#" className="block text-black/40 hover:text-black">Best Sellers</Link>
              <Link href="#" className="block text-black/40 hover:text-black">Collections</Link>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3">Support</h5>
            <div className="space-y-2 text-sm">
              <Link href="#" className="block text-black/40 hover:text-black">Help Center</Link>
              <Link href="#" className="block text-black/40 hover:text-black">Returns</Link>
              <Link href="#" className="block text-black/40 hover:text-black">Contact</Link>
            </div>
          </div>
          <div>
            <h5 className="font-medium mb-3">Company</h5>
            <div className="space-y-2 text-sm">
              <Link href="#" className="block text-black/40 hover:text-black">About</Link>
              <Link href="#" className="block text-black/40 hover:text-black">Careers</Link>
              <Link href="#" className="block text-black/40 hover:text-black">Sustainability</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-black/5 mt-8 pt-8 text-center text-sm text-black/40">
          © 2026 NOVA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}