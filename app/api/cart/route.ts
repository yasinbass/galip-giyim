import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/auth.config'

// Kullanıcının sepetini getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true
              }
            }
          }
        }
      }
    })

    if (!user?.cart) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json(user.cart)
  } catch (error) {
    return NextResponse.json({ error: 'Sepet getirilemedi' }, { status: 500 })
  }
}

// Sepete ürün ekle
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity } = body

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { cart: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 })
    }

    // Ürünün stokta olup olmadığını kontrol et
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Yetersiz stok' }, { status: 400 })
    }

    let cart = user.cart

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id
        }
      })
    }

    // Sepette ürün var mı kontrol et
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    })

    if (existingItem) {
      // Ürün varsa miktarını güncelle
      await prisma.cartItem.update({
        where: {
          id: existingItem.id
        },
        data: {
          quantity: existingItem.quantity + quantity
        }
      })
    } else {
      // Ürün yoksa yeni ekle
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity
        }
      })
    }

    return NextResponse.json({ message: 'Ürün sepete eklendi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ürün sepete eklenemedi' }, { status: 500 })
  }
} 