'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function MakeAdmin() {
  const router = useRouter()
  const { data: session } = useSession()
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    const makeAdmin = async () => {
      if (!session?.user?.email) {
        router.push('/auth/signin')
        return
      }

      try {
        setStatus('loading')
        const response = await fetch('/api/admin/make-admin', {
          method: 'POST',
        })

        if (!response.ok) {
          throw new Error('Admin yapma işlemi başarısız oldu')
        }

        setStatus('success')
        setTimeout(() => {
          router.push('/admin')
        }, 2000)
      } catch (error) {
        console.error('Hata:', error)
        setStatus('error')
      }
    }

    makeAdmin()
  }, [session, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {status === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Admin yetkisi veriliyor...</p>
          </div>
        )}
        {status === 'success' && (
          <div className="text-center">
            <div className="text-green-500 text-xl mb-4">✓</div>
            <p className="text-gray-600">Admin yetkisi başarıyla verildi!</p>
            <p className="text-sm text-gray-500 mt-2">Admin paneline yönlendiriliyorsunuz...</p>
          </div>
        )}
        {status === 'error' && (
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">✗</div>
            <p className="text-gray-600">Bir hata oluştu.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Tekrar Dene
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 