import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from './components/SessionProvider'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import type { Metadata } from "next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Galip Giyim - Erkek Giyim Mağazası',
  description: 'Kaliteli ve şık erkek giyim ürünleri',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="tr">
      <body className={inter.className}>
        <CartProvider>
          <SessionProvider session={session}>
            <Header />
            <main>
              {children}
            </main>
            <Toaster />
          </SessionProvider>
        </CartProvider>
      </body>
    </html>
  )
} 