import { prisma } from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Oturum açmanız gerekiyor' }, { status: 401 })
    }

    // Kullanıcıyı admin yap
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { isAdmin: true }
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Admin yapma işlemi sırasında hata:', error)
    return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
  }
} 