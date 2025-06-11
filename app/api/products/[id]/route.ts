import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/auth.config'
import { uploadImage } from '@/app/lib/uploadImage'

// Tekil ürün getir
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) }
    })
    
    if (!product) {
      return NextResponse.json({ error: 'Ürün bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Ürün getirilemedi' }, { status: 500 })
  }
}

// Ürün güncelle (sadece admin)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const formData = await request.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const stock = parseInt(formData.get('stock') as string)
    const categoryId = parseInt(formData.get('categoryId') as string)
    const image = formData.get('image') as File | null

    let imageUrl: string | undefined

    if (image) {
      imageUrl = await uploadImage(image)
    }

    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        ...(imageUrl && { imageUrl })
      }
    })
    
    return NextResponse.json(product)
  } catch (error) {
    console.error('Ürün güncellenirken hata:', error)
    return NextResponse.json({ error: 'Ürün güncellenemedi' }, { status: 500 })
  }
}

// Ürün sil (sadece admin)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    await prisma.product.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ message: 'Ürün başarıyla silindi' })
  } catch (error) {
    return NextResponse.json({ error: 'Ürün silinemedi' }, { status: 500 })
  }
} 