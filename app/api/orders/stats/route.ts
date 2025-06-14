import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    // Şu anki ayın başlangıç tarihi
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // Şu anki ayın bitiş tarihi
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    // Son siparişleri al
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    });

    // Aylık geliri hesapla
    const monthlyOrders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      },
      select: {
        totalAmount: true
      }
    });

    const monthlyRevenue = monthlyOrders.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0
    );

    // Son siparişleri formatla
    const formattedOrders = recentOrders.map(order => ({
      id: order.id,
      customerName: order.user.name || 'İsimsiz Müşteri',
      status: order.status,
      date: order.createdAt.toISOString()
    }));

    return NextResponse.json({
      monthlyRevenue,
      recentOrders: formattedOrders
    });
  } catch (error) {
    console.error('Sipariş istatistikleri alınırken hata:', error);
    return NextResponse.json(
      { error: 'Sipariş istatistikleri alınamadı' },
      { status: 500 }
    );
  }
} 