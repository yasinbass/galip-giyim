'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Galip Giyim',
    contactEmail: 'info@galipgiyim.com',
    phoneNumber: '+90 555 123 4567',
    address: 'İstanbul, Türkiye',
    aboutContent: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await fetch('/api/settings/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aboutContent: settings.aboutContent }),
      })
      toast.success('Ayarlar başarıyla güncellendi')
    } catch (error) {
      toast.error('Ayarlar güncellenirken bir hata oluştu')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Site Ayarları</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                Site Adı
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                İletişim E-posta
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Telefon Numarası
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Adres
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700">
                Hakkımızda Sayfası İçeriği
              </label>
              <textarea
                id="aboutContent"
                name="aboutContent"
                value={settings.aboutContent}
                onChange={e => setSettings(prev => ({ ...prev, aboutContent: e.target.value }))}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Hakkımızda sayfası için içerik girin..."
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ayarları Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 