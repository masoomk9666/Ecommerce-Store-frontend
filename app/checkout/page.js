'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Check, Truck, CreditCard, MapPin, Package } from 'lucide-react'
import { useCartStore } from '@/store/cartStore.js'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const { items, total } = useCartStore()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    shippingMethod: 'standard',
    paymentMethod: 'card'
  })

  const steps = [
    { number: 1, label: 'Shipping', icon: MapPin },
    { number: 2, label: 'Payment', icon: CreditCard },
    { number: 3, label: 'Confirm', icon: Check },
  ]

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold">Your cart is empty</h2>
        <Link href="/" className="btn-primary mt-6 inline-block">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm hover:text-black/60 transition mb-6">
        <ChevronLeft size={16} /> Back to Cart
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12 max-w-2xl">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center flex-1">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= s.number ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s.number ? <Check size={20} /> : <s.icon size={20} />}
              </div>
              <span className={`text-sm font-medium ${step >= s.number ? 'text-black' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                step > s.number ? 'bg-black' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="card-premium p-6">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-premium"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-premium"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-premium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-premium"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-premium"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="input-premium"
                        placeholder="NY"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="input-premium"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="input-premium"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Shipping Method</label>
                    <select
                      name="shippingMethod"
                      value={formData.shippingMethod}
                      onChange={handleInputChange}
                      className="input-premium"
                    >
                      <option value="standard">Standard (5-7 days) - Free</option>
                      <option value="express">Express (2-3 days) - $15.00</option>
                      <option value="overnight">Overnight (1 day) - $30.00</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="input-premium"
                    >
                      <option value="card">Credit / Debit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="applepay">Apple Pay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      className="input-premium"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input
                        type="text"
                        className="input-premium"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="text"
                        className="input-premium"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Review Order</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-sm text-black/60">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zip}<br />
                      {formData.country}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium mb-2">Order Items</h3>
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm py-1">
                        <span>{item.name} × {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button onClick={handlePrevStep} className="px-6 py-3 border border-gray-200 rounded-full hover:border-black transition">
                Back
              </button>
            )}
            <button onClick={handleNextStep} className="btn-primary ml-auto">
              {step === 3 ? 'Place Order' : 'Continue'}
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card-premium p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-black/60">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Shipping</span>
                <span>{formData.shippingMethod === 'standard' ? 'Free' : '$15.00'}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>${(total + (formData.shippingMethod === 'standard' ? 0 : 15)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}