import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const setting = await prisma.setting.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json({ aboutContent: setting?.aboutText || '' });
}

export async function POST(req: Request) {
  const { aboutContent } = await req.json();
  const setting = await prisma.setting.upsert({
    where: { id: 1 },
    update: { aboutText: aboutContent },
    create: { id: 1, aboutText: aboutContent },
  });
  return NextResponse.json({ aboutContent: setting.aboutText });
} 