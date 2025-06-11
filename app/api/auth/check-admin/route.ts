import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/auth.config';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ isAdmin: false });
    }

    return NextResponse.json({ isAdmin: session.user.isAdmin });
  } catch (error) {
    console.error('Admin kontrolü yapılırken hata:', error);
    return NextResponse.json(
      { error: 'Admin kontrolü yapılamadı' },
      { status: 500 }
    );
  }
} 