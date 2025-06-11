const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    // Önce mevcut admin kullanıcısını sil
    await prisma.user.deleteMany({
      where: {
        email: 'admin@galipgiyim.com'
      }
    })

    // Admin şifresini hashleme
    const password = await bcrypt.hash('admin123', 10)

    // Admin kullanıcısını oluştur
    const admin = await prisma.user.create({
      data: {
        email: 'admin@galipgiyim.com',
        password: password,
        name: 'Admin',
        role: 'ADMIN',
        isAdmin: true
      }
    })

    console.log('Admin kullanıcısı oluşturuldu:', admin)

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

main() 