import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Önce admin kullanıcısı var mı kontrol et
    const adminExists = await prisma.user.findFirst({
      where: {
        role: "ADMIN"
      }
    });

    if (adminExists) {
      return NextResponse.json(
        { message: 'Admin kullanıcısı zaten mevcut' },
        { status: 400 }
      );
    }

    // Admin kullanıcısı oluştur
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    const { password: _, ...adminWithoutPassword } = admin;

    return NextResponse.json({
      message: 'Admin kullanıcısı başarıyla oluşturuldu',
      user: adminWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error('Setup hatası:', error);
    return NextResponse.json(
      { message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 