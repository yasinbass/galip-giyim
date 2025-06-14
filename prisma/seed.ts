import { PrismaClient } from '@prisma/client'
import { CATEGORIES } from '../app/constants/categories'

const prisma = new PrismaClient()

async function main() {
  console.log('Veritabanı seed işlemi başlıyor...')

  // Kategorileri ekle
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        name: category.name
      }
    })
  }

  // Kategori ekle
  const category = await prisma.category.create({
    data: {
      name: 'Tişört',
    },
  })

  // Ürün ekle
  await prisma.product.create({
    data: {
      name: 'Basic Tişört',
      description: 'Pamuklu beyaz tişört',
      price: 199.99,
      stock: 100,
      imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
      categoryId: category.id,
    },
  })

  console.log('Kategoriler ve ürün başarıyla eklendi')
}

main()
  .catch((e) => {
    console.error('Seed işlemi sırasında hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 