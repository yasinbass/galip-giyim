interface OrderSummaryProps {
  subtotal: number
  shippingCost: number
}

export default function OrderSummary({ subtotal, shippingCost = 44.99 }: OrderSummaryProps) {
  const isFreeShipping = subtotal >= 250
  const total = isFreeShipping ? subtotal : subtotal + shippingCost

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Ürünlerin Toplamı</span>
          <span className="text-gray-900">{subtotal.toLocaleString('tr-TR')} TL</span>
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Kargo Toplam</span>
            <span className="text-gray-900">{shippingCost.toLocaleString('tr-TR')} TL</span>
          </div>
          
          {isFreeShipping && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-green-600">Kargo İndirimi</span>
              <span className="text-green-600">-{shippingCost.toLocaleString('tr-TR')} TL</span>
            </div>
          )}

          <p className="text-xs text-indigo-600 mt-2">
            250 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">Toplam</span>
            <span className="text-xl font-bold text-gray-900">
              {total.toLocaleString('tr-TR')} TL
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 