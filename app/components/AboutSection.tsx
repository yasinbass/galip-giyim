'use client';

import { useState } from 'react';
import { ShieldCheckIcon, TruckIcon, SparklesIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Galip Giyim</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            2024 yılından bu yana kaliteli ve şık erkek giyim ürünleriyle hizmetinizdeyiz. 
            Modern tasarımları uygun fiyatlarla sizlere sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <ShieldCheckIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Kalite Garantisi</h3>
            <p className="text-gray-600">
              Premium kumaşlar ve özenli dikimle üretilen ürünlerimiz uzun ömürlü kullanım sağlar.
            </p>
          </div>

          <div className="text-center p-6">
            <TruckIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hızlı Teslimat</h3>
            <p className="text-gray-600">
              Siparişleriniz özenle paketlenir ve en kısa sürede adresinize teslim edilir.
            </p>
          </div>

          <div className="text-center p-6">
            <SparklesIcon className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Tasarımlar</h3>
            <p className="text-gray-600">
              Sürekli yenilenen koleksiyonumuzla modayı yakından takip ediyoruz.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            <span>Daha Fazla Bilgi</span>
            {isExpanded ? (
              <ChevronUpIcon className="ml-2 h-5 w-5" />
            ) : (
              <ChevronDownIcon className="ml-2 h-5 w-5" />
            )}
          </button>

          {isExpanded && (
            <div className="mt-8 max-w-3xl mx-auto animate-fadeIn">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hakkımızda Daha Fazla Bilgi</h3>
                <div className="space-y-4 text-left">
                  <div>
                    <h4 className="font-medium text-gray-900">Vizyonumuz</h4>
                    <p className="text-gray-600">
                      Erkek giyiminde kalite ve şıklığı ulaşılabilir fiyatlarla sunarak, 
                      her erkeğin kendini özel hissetmesini sağlamak.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Misyonumuz</h4>
                    <p className="text-gray-600">
                      Müşterilerimize en kaliteli ürünleri, en iyi hizmet anlayışıyla sunmak ve 
                      sürdürülebilir moda anlayışını desteklemek.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Değerlerimiz</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Müşteri memnuniyeti odaklı hizmet</li>
                      <li>Kaliteden ödün vermeme</li>
                      <li>Sürdürülebilir ve etik üretim</li>
                      <li>Yenilikçi tasarım anlayışı</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 