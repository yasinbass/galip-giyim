import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/auth.config'
import { Prisma } from '@prisma/client'

// Tüm kategorileri getir
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Kategoriler yüklenirken hata:', error)
    return NextResponse.json(
      { error: 'Kategoriler yüklenemedi' },
      { status: 500 }
    )
  }
}

// Yeni kategori ekle (sadece admin)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 })
    }

    const admin = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isAdmin: true }
    })

    if (!admin?.isAdmin) {
      return NextResponse.json({ error: 'Bu işlem için yetkiniz yok' }, { status: 403 })
    }

    const body = await request.json()
    const category = await prisma.category.create({
      data: {
        name: body.name
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.error('Kategori eklenemedi:', error)
    return NextResponse.json({ error: 'Kategori eklenemedi' }, { status: 500 })
  }
} 