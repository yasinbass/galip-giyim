'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import PaymentForm from '@/app/components/PaymentForm'
import OrderSummary from '@/app/components/OrderSummary'

export default function CheckoutPage() {
  const router = useRouter()
  const { items } = useCart()
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
      return
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setSubtotal(total)
  }, [items, router])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf - Ödeme Formu */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Ödeme Bilgileri</h1>
            <PaymentForm />
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="lg:sticky lg:top-6">
            <OrderSummary subtotal={subtotal} shippingCost={44.99} />
          </div>
        </div>
      </div>
    </div>
  )
} 