import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      
      addItem: (product) => {
        const items = get().items
        const existing = items.find(item => item.id === product.id)
        
        if (existing) {
          const updated = items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
          set({ items: updated })
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] })
        }
        get().calculateTotal()
      },
      
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) })
        get().calculateTotal()
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        const items = get().items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
        set({ items })
        get().calculateTotal()
      },
      
      calculateTotal: () => {
        const total = get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        set({ total })
      },
      
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
)