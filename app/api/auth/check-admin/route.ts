import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    return NextResponse.json({ isAdmin: session.user.role === 'ADMIN' });
  } catch (error) {
    console.error('Admin kontrolü yapılırken hata:', error);
    return NextResponse.json(
      { error: 'Admin kontrolü yapılamadı' },
      { status: 500 }
    );
  }
} 