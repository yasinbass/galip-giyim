'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  TrendingUpIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

// Örnek veriler
const dailySales = [
  { name: 'Pazartesi', satis: 2500 },
  { name: 'Salı', satis: 3200 },
  { name: 'Çarşamba', satis: 2800 },
  { name: 'Perşembe', satis: 3800 },
  { name: 'Cuma', satis: 4200 },
  { name: 'Cumartesi', satis: 5000 },
  { name: 'Pazar', satis: 3500 }
];

const monthlySales = [
  { name: 'Ocak', satis: 45000 },
  { name: 'Şubat', satis: 52000 },
  { name: 'Mart', satis: 48000 },
  { name: 'Nisan', satis: 61000 },
  { name: 'Mayıs', satis: 55000 },
  { name: 'Haziran', satis: 67000 }
];

const stats = [
  {
    name: 'Günlük Satış',
    value: '₺4,200',
    change: '+14.5%',
    icon: CurrencyDollarIcon
  },
  {
    name: 'Haftalık Satış',
    value: '₺25,000',
    change: '+7.2%',
    icon: ChartBarIcon
  },
  {
    name: 'Aylık Satış',
    value: '₺67,000',
    change: '+12.8%',
    icon: TrendingUpIcon
  },
  {
    name: 'Kar Marjı',
    value: '%32.5',
    change: '+2.1%',
    icon: ScaleIcon
  }
];

export default function SalesReports() {
  const [timeframe, setTimeframe] = useState('daily');

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Satış Raporları</h1>

        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((item) => (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {item.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grafik Seçenekleri */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Satış Grafiği</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setTimeframe('daily')}
                className={`px-4 py-2 rounded-md ${
                  timeframe === 'daily'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Günlük
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`px-4 py-2 rounded-md ${
                  timeframe === 'monthly'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Aylık
              </button>
            </div>
          </div>

          {/* Satış Grafiği */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {timeframe === 'daily' ? (
                <BarChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="satis" name="Satış (TL)" fill="#4f46e5" />
                </BarChart>
              ) : (
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="satis"
                    name="Satış (TL)"
                    stroke="#4f46e5"
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kar/Zarar Analizi */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Kar/Zarar Analizi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Toplam Gelir
              </h3>
              <p className="text-3xl font-bold text-indigo-600">₺67,000</p>
              <p className="text-sm text-gray-500 mt-1">Son 30 gün</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Toplam Maliyet
              </h3>
              <p className="text-3xl font-bold text-red-600">₺45,225</p>
              <p className="text-sm text-gray-500 mt-1">Son 30 gün</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Net Kar</h3>
              <p className="text-3xl font-bold text-green-600">₺21,775</p>
              <p className="text-sm text-gray-500 mt-1">Son 30 gün</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 