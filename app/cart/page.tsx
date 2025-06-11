'use client';

import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import CartItem from '@/app/components/CartItem';

export default function CartPage() {
  const router = useRouter();
  const { items, total = 0 } = useCart();

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push('/delivery');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sepetiniz Boş</h2>
          <p className="text-gray-600 mb-8">Alışverişe başlamak için ürünlerimize göz atın.</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Alışverişe Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Adımlar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="bg-indigo-600 rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-white text-sm font-medium">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Sepet</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">2</span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Teslimat</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sepet Ürünleri */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900">Sepetim</h1>
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <CartItem key={`${item.id}-${item.size}`} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sepet Özeti */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-base">
                  <span>Toplam</span>
                  <span className="font-semibold">{total.toLocaleString('tr-TR')} TL</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Alışverişi Tamamla
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 