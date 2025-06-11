import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.user.count({
      where: {
        role: 'USER' // Sadece normal kullanıcıları say
      }
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Kullanıcı sayısı alınırken hata:', error);
    return NextResponse.json(
      { error: 'Kullanıcı sayısı alınamadı' },
      { status: 500 }
    );
  }
} 