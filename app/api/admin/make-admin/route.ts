import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/app/api/auth/auth.config'

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

    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email gerekli' }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { email },
      data: { isAdmin: true }
    })

    return NextResponse.json({ message: 'Kullanıcı admin yapıldı', user })
  } catch (error) {
    console.error('Admin yapma hatası:', error)
    return NextResponse.json(
      { error: 'Kullanıcı admin yapılamadı' },
      { status: 500 }
    )
  }
} 