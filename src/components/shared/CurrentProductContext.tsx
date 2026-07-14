'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type ContextValue = {
  productName: string | null
  setProductName: (name: string | null) => void
}

const CurrentProductContext = createContext<ContextValue | null>(null)

export function CurrentProductProvider({ children }: { children: ReactNode }) {
  const [productName, setProductName] = useState<string | null>(null)
  return (
    <CurrentProductContext.Provider value={{ productName, setProductName }}>
      {children}
    </CurrentProductContext.Provider>
  )
}

export function useCurrentProductName(): string | null {
  const ctx = useContext(CurrentProductContext)
  return ctx?.productName ?? null
}

export function SetCurrentProduct({ name }: { name: string }) {
  const ctx = useContext(CurrentProductContext)
  useEffect(() => {
    ctx?.setProductName(name)
    return () => ctx?.setProductName(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])
  return null
}
