import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const email = 'admin@example.com'
    const password = 'admin123456'

    // Kullanıcı var mı kontrolü
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('Bu email adresi zaten kullanımda')
      return
    }

    // Şifre hash'leme
    const hashedPassword = await bcrypt.hash(password, 10)

    // Admin kullanıcı oluşturma
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
        name: "Admin User"
      },
    })

    console.log('Admin kullanıcısı başarıyla oluşturuldu:', {
      id: user.id,
      email: user.email,
      role: user.role
    })

    // Kategorileri oluştur
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Takım Elbise'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Gömlek'
        }
      }),
      prisma.category.create({
        data: {
          name: 'Pantolon'
        }
      })
    ])

    console.log('Kategoriler oluşturuldu:', categories)

    // Örnek ürünler oluştur
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'Klasik Fit Takım Elbise',
          description: 'Siyah renk, %100 yün, klasik kesim takım elbise',
          price: 2499.99,
          stock: 10,
          imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80',
          categoryId: categories[0].id
        }
      }),
      prisma.product.create({
        data: {
          name: 'Slim Fit Gömlek',
          description: 'Beyaz renk, %100 pamuk, slim fit kesim gömlek',
          price: 399.99,
          stock: 25,
          imageUrl: 'https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80',
          categoryId: categories[1].id
        }
      }),
      prisma.product.create({
        data: {
          name: 'Kot Pantolon',
          description: 'Lacivert renk, %98 pamuk %2 elastan, regular fit kot pantolon',
          price: 599.99,
          stock: 15,
          imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80',
          categoryId: categories[2].id
        }
      })
    ])

    console.log('Örnek ürünler oluşturuldu:', products)
  } catch (error) {
    console.error('Hata:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin() 