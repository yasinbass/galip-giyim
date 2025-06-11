import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.product.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Ürün sayısı alınırken hata:', error);
    return NextResponse.json(
      { error: 'Ürün sayısı alınamadı' },
      { status: 500 }
    );
  }
} 