'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import DeliveryAddressForm from '@/app/components/DeliveryAddressForm'

export default function DeliveryPage() {
  const router = useRouter()
  const { items } = useCart()

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Adımlar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-white text-sm font-medium">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Sepet</span>
            </div>
            <div className="h-0.5 w-16 bg-indigo-600"></div>
            <div className="flex items-center">
              <div className="bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-white text-sm font-medium">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Teslimat</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">3</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Ödeme</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Teslimat Bilgilerini Girin
          </h1>
          <DeliveryAddressForm />
        </div>
      </div>
    </div>
  )
} 