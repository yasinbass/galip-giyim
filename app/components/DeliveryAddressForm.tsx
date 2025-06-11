'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeliveryAddressData {
  fullName: string
  phone: string
  email: string
  city: string
  district: string
  neighborhood: string
  address: string
}

export default function DeliveryAddressForm() {
  const router = useRouter()
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [formData, setFormData] = useState<DeliveryAddressData>({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  })

  const [errors, setErrors] = useState<Partial<DeliveryAddressData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<DeliveryAddressData> = {}

    // Ad Soyad kontrolü
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Ad Soyad gerekli'
    }

    // Telefon kontrolü
    const phoneRegex = /^(\+90|0)?[0-9]{10}$/
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası gerekli'
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası girin (+90 veya 10 haneli numara)'
    }

    // E-posta kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresi gerekli'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin'
    }

    // Diğer adres alanları kontrolü
    if (!formData.city.trim()) newErrors.city = 'İl gerekli'
    if (!formData.district.trim()) newErrors.district = 'İlçe gerekli'
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Mahalle gerekli'
    if (!formData.address.trim()) newErrors.address = 'Açık adres gerekli'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    if (!numbers.startsWith('90') && numbers.length === 10) {
      return '+90 ' + numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
    }
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'phone') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Form verilerini localStorage'a kaydedelim ki ödeme sayfasında kullanabilelim
      localStorage.setItem('deliveryAddress', JSON.stringify({
        ...formData,
        sameAsBilling
      }))
      
      // Ödeme sayfasına yönlendir
      router.push('/checkout')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Ad Soyad
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.fullName
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefon Numarası
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+90 555 123 4567"
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.phone
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-posta
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.email
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            İl
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.city
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-600">{errors.city}</p>
          )}
        </div>

        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">
            İlçe
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.district
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.district && (
            <p className="mt-1 text-xs text-red-600">{errors.district}</p>
          )}
        </div>

        <div>
          <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
            Mahalle
          </label>
          <input
            type="text"
            id="neighborhood"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.neighborhood
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          {errors.neighborhood && (
            <p className="mt-1 text-xs text-red-600">{errors.neighborhood}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Açık Adres
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors.address
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }`}
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-600">{errors.address}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="sameAsBilling"
          name="sameAsBilling"
          type="checkbox"
          checked={sameAsBilling}
          onChange={(e) => setSameAsBilling(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="sameAsBilling" className="ml-2 block text-sm text-gray-900">
          Fatura adresim teslimat adresim ile aynı
        </label>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Ödeme Sayfasına Geç
      </button>
    </form>
  )
} 