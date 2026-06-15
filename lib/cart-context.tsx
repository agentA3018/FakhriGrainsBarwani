'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

/* ── Types ──────────────────────────────────────────────── */

export interface CartItem {
  productId: string
  productName: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (productId: string, productName: string) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getQuantity: (productId: string) => number
}

/* ── Constants ──────────────────────────────────────────── */

const STORAGE_KEY = 'fgb-inquiry-cart'

/* ── Context ────────────────────────────────────────────── */

const CartContext = createContext<CartContextValue | undefined>(undefined)

/* ── Provider ───────────────────────────────────────────── */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  /* Restore from localStorage on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      /* ignore corrupt data */
    }
    setHydrated(true)
  }, [])

  /* Persist to localStorage on every change (skip initial hydration) */
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  /* ── Actions ────────────────────────────────────────── */

  const addItem = useCallback((productId: string, productName: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { productId, productName, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId)
        return
      }
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId ? { ...i, quantity } : i,
        ),
      )
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getQuantity = useCallback(
    (productId: string) => {
      return items.find((i) => i.productId === productId)?.quantity ?? 0
    },
    [items],
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, getQuantity }}
    >
      {children}
    </CartContext.Provider>
  )
}

/* ── Hook ───────────────────────────────────────────────── */

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
