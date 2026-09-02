import React, { createContext, useContext, useState, useEffect } from 'react'
import { Lang } from '../i18n'

export interface SelectedService {
  num: string
  name: Record<Lang, string>
  price: number
  period?: string
  metric: Record<Lang, string>
  desc: Record<Lang, string>
}

interface ServiceCartContextType {
  selectedServices: SelectedService[]
  addService: (service: SelectedService) => void
  removeService: (serviceNum: string) => void
  clearCart: () => void
  isServiceSelected: (serviceNum: string) => boolean
  cartCount: number
}

const ServiceCartContext = createContext<ServiceCartContextType | undefined>(undefined)

export function ServiceCartProvider({ children }: { children: React.ReactNode }) {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('xr-service-cart')
    if (stored) {
      try {
        setSelectedServices(JSON.parse(stored))
      } catch {
        localStorage.removeItem('xr-service-cart')
      }
    }
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('xr-service-cart', JSON.stringify(selectedServices))
  }, [selectedServices])

  const addService = (service: SelectedService) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s.num === service.num)) return prev
      return [...prev, service]
    })
  }

  const removeService = (serviceNum: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.num !== serviceNum))
  }

  const clearCart = () => {
    setSelectedServices([])
  }

  const isServiceSelected = (serviceNum: string) => {
    return selectedServices.some((s) => s.num === serviceNum)
  }

  return (
    <ServiceCartContext.Provider
      value={{
        selectedServices,
        addService,
        removeService,
        clearCart,
        isServiceSelected,
        cartCount: selectedServices.length,
      }}
    >
      {children}
    </ServiceCartContext.Provider>
  )
}

export function useServiceCart() {
  const ctx = useContext(ServiceCartContext)
  if (!ctx) {
    throw new Error('useServiceCart must be used within ServiceCartProvider')
  }
  return ctx
}
